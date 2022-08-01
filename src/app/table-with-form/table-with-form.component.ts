import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { IStudentDetail, IStudentTableFormat } from '../interfaces/tabs.interface';
import { StudentDetailsService } from '../services/student-details.service';

@Component({
  selector: 'app-table-with-form',
  templateUrl: './table-with-form.component.html',
  styleUrls: ['./table-with-form.component.scss']
})
export class TableWithFormComponent implements OnInit {

  constructor(private _studentDetails: StudentDetailsService,
              private _fb: FormBuilder,
              private route: ActivatedRoute) { }
  studentData: IStudentTableFormat[] = [];
  tableData: MatTableDataSource<IStudentTableFormat> = new MatTableDataSource();
  displayedColumns = ['id', 'name', 'email', 'Maths', 'English', 'French', 'Science', 'Social'];

  tableFormGroup: FormGroup = this._fb.group({
    studentFormArray: this._fb.array([])
  });

  grade: number = 0;
  showActionButtons = true;
  initData: IStudentDetail[] = [];
  newScores: IStudentDetail[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.grade = +params['id'];
      this.getData();
    });
    this.getData();
  }
  getData() {
    if (this._studentDetails.studentData.length === 0) {
      this._studentDetails.getData().subscribe((data: any) => {
        this._studentDetails.studentData = data;
        this.transformData();
      });
    } else {
      this.transformData();
    }
  }
  transformData() {
    const data = this._studentDetails.studentData;
    const filteredData = data.filter((x: any) => x.grade === this.grade);
      let modifiedData: IStudentTableFormat[] = [];

      filteredData.forEach((student: any) => {
        const obj: any = {}; // { id: 0, name: '', email: '', Maths: 0, English: 0, French: 0, Science: 0, Social: 0 };
        obj.id = student.id;
        obj.name = student.name;
        obj.email = student.email;
        student.performance.forEach((sub: { subject: string | number; }) => {
          obj[sub.subject] = student.performance.find((x: { subject: any; }) => x.subject === sub.subject)?.score;
        });
        modifiedData.push(obj);
      })
      console.log(JSON.stringify(modifiedData));
      if (modifiedData[0]) {
        // this.columns = Object.keys(modifiedData[0]);
        this.displayedColumns = Object.keys(modifiedData[0]);
      }

      this.tableData = new MatTableDataSource(modifiedData);
      // console.log(this.tableData);
      this.genStudentForm(modifiedData);
      this.initData = JSON.parse(JSON.stringify(data));
      this.newScores = JSON.parse(JSON.stringify(data));
  }
  // getData() {
  //   this._studentDetails.getData().subscribe((data: any) => {
      
  //   });
  // }
  genStudentForm(filteredData: IStudentTableFormat[]) {
    const studentCtrls = this.tableFormGroup.get('studentFormArray') as FormArray;
    filteredData.forEach((student: IStudentTableFormat) => {
      studentCtrls.push(this.genFormCtrl(student));
    });
  }
  genFormCtrl(student: IStudentTableFormat) {
    return this._fb.group({
      id: new FormControl(student.id),
      name: new FormControl(student.name, [Validators.required, Validators.pattern('[a-z A-Z]{2,50}')]),
      email: new FormControl(student.email, [Validators.required, Validators.email]),
      Maths: new FormControl(student.Maths, Validators.required),
      English: new FormControl(student.English, Validators.required),
      French: new FormControl(student.French, Validators.required),
      Science: new FormControl(student.Science, Validators.required),
      Social: new FormControl(student.Social, Validators.required),
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
  changeScore(id: number, type: string, changedVal: any, subject: string) {
    const ind = this.newScores.findIndex(x => x.id === id);
    switch (type) {
      case 'subject':
        const subInd = this.newScores[ind].performance.findIndex((x: { subject: string; }) => x.subject === subject);
        this.newScores[ind].performance[subInd].score = +changedVal;
        break;
      case 'name':
        changedVal ? this.newScores[ind].name = changedVal : this.newScores[ind].name = this.newScores[ind].name;
        break;
      case 'email':
        changedVal ? this.newScores[ind].email = changedVal : this.newScores[ind].email = this.newScores[ind].email;
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
    this.transformData();
  }
}
