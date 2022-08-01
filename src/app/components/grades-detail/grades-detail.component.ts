import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { IStudentDetail, IStudentTableFormat } from 'src/app/interfaces/tabs.interface';
import { StudentDetailsService } from 'src/app/services/student-details.service';
@Component({
  selector: 'app-grades-detail',
  templateUrl: './grades-detail.component.html',
  styleUrls: ['./grades-detail.component.scss']
})
export class GradesDetailComponent implements OnInit {
  grade: any;
  tableData: MatTableDataSource<IStudentTableFormat> = new MatTableDataSource;
  columns: string[] = [];
  displayedColumns: string[] = [];
  showActionButtons = true;
  initData: IStudentDetail[] = [];
  newScores: IStudentDetail[] = [];
  // @ViewChild('tableForm', {static: true}) tableForm: any;
  
  tableForm: FormArray = new FormArray([
    new FormControl('name', Validators.pattern('^[a-zA-Z]{50}')),
    new FormControl('email', Validators.email),
    new FormControl('Maths'),
    new FormControl('English'),
    new FormControl('French'),
    new FormControl('Science'),
    new FormControl('Social')
  ]);
  tableFormGroup: FormGroup = new FormGroup({
    studentsTable: this.tableForm
  });
  // For Validation
  emailValidatorPattern = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

  constructor(private _studentDetails: StudentDetailsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.grade = +params['id'];
      this.displayDetails();
    });
  }
  displayDetails() {
    this._studentDetails.getData().subscribe((data: any) => {
      const filteredData = data.filter((x: IStudentDetail) => x.grade === this.grade);
      let modifiedData: IStudentTableFormat[] = [];

      filteredData.forEach((student: IStudentDetail) => {
        const obj: any = { id: 0, name: '', email: '', Maths: 0, English: 0, French: 0, Science: 0, Social: 0 };
        obj.id = student.id;
        obj.name = student.name;
        obj.email = student.email;
        student.performance.forEach(sub => {
          obj[sub.subject] = student.performance.find(x => x.subject === sub.subject)?.score;
        });
        modifiedData.push(obj);
      })
      console.log(JSON.stringify(modifiedData));
      if (modifiedData[0]) {
        this.columns = Object.keys(modifiedData[0]);
        this.displayedColumns = Object.keys(modifiedData[0]);
      }

      this.tableData = new MatTableDataSource(modifiedData);
      // console.log(this.tableData);
      this.initData = JSON.parse(JSON.stringify(data));
      this.newScores = JSON.parse(JSON.stringify(data));
    });
  }
  showButtons(event: boolean) { // tested
    this.showActionButtons = event;
  }
  scoreChange(id: number, type: string, subject: string, event: any) { // tested
    this.showButtons(true);
    // this._studentDetails.changeScore(id, subject, +event.target.innerText);
    this.changeScore(id, type, event.target.value, subject);
  }
  changeScore(id: number, type: string, changedVal: any, subject?: string) {
    const ind = this.newScores.findIndex(x => x.id === id);
    switch (type) {
      case 'subject':
        const subInd = this.newScores[ind].performance.findIndex((x: { subject: string; }) => x.subject === subject);
        this.newScores[ind].performance[subInd].score = +changedVal;
        break;
      case 'name':
        this.newScores[ind].name = changedVal;
        break;
      case 'email':
        this.newScores[ind].email = changedVal;
        break;
    }
  }
  saveChanges() {
    // console.log(this.tableForm)
    this._studentDetails.saveNewScores(this.newScores);
    this.showButtons(false);
  }
  cancelSave() { // tested
    this.showButtons(false);
    this.newScores = JSON.parse(JSON.stringify(this.initData));
    this.displayDetails();
  }
}
