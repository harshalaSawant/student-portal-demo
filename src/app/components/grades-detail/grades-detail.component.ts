import { identifierName } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { IStudentDetail } from 'src/app/interfaces/tabs.interface';
import { StudentDetailsService } from 'src/app/services/student-details.service';

export interface StudentTableFormat {
  id: number;
  name: string;
  email: string;
  Maths: number;
  English: number;
  French: number;
  Science: number;
  Social: number;
}
@Component({
  selector: 'app-grades-detail',
  templateUrl: './grades-detail.component.html',
  styleUrls: ['./grades-detail.component.scss']
})
export class GradesDetailComponent implements OnInit {
  grade: any;
  studentData: IStudentDetail[] = [];
  tableData: any = [];
  columns: string[] = [];
  displayedColumns: string[] = [];
  showActionButtons = true;
  initData: any[] = [];
  newScores: any[] = [];

  // Validation
  emailValidatorPattern = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

  constructor(private _studentDetails: StudentDetailsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.grade = +params['id'];
      // this.currentGradePassPercent = this._studentDetails.getGradePercent(this.grade)?.value || 0;
      this.displayDetails();
    });
  }
  displayDetails() {
    this._studentDetails.getData().subscribe(data => {
      this.studentData = data;
      const filteredData = data.filter(x => x.grade === this.grade);
      let modifiedData: any[] = [];
      filteredData.forEach(student => {

        const obj: any = {id: 0, name: '', email: '', Maths: 0, English: 0, French: 0, Science: 0, Social: 0};
        
        obj.id = student.id;
        obj.name = student.name;
        obj.email = student.email;
        student.performance.forEach(sub => {
          obj[sub.subject] = student.performance.find(x=> x.subject === sub.subject)?.score;
        });
        modifiedData.push(obj);
      })
      console.log(modifiedData);
      if (modifiedData[0]) {
        this.columns = Object.keys(modifiedData[0]);
        this.displayedColumns = Object.keys(modifiedData[0]);
      }
      
      this.tableData = new MatTableDataSource(modifiedData);
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
    switch(type) {
      case 'subject' :
        const subInd = this.newScores[ind].performance.findIndex((x: { subject: string; }) => x.subject === subject);
        this.newScores[ind].performance[subInd].score = +changedVal;
        break;
      case 'name': 
        const nameInd = this.newScores[ind].performance.findIndex((x: { name: string; }) => x.name === type);
        this.newScores[ind].name = changedVal;
        break;
      case 'email': 
        const emailInd = this.newScores[ind].performance.findIndex((x: { email: string; }) => x.email === type);
        this.newScores[ind].email = changedVal;
        break;
    }    
  }
  saveChanges() {
    this._studentDetails.saveNewScores(this.newScores);
    this.showButtons(false);
  }
  cancelSave() { // tested
    this.showButtons(false);
    this.newScores = JSON.parse(JSON.stringify(this.initData));
    this.displayDetails();
  }
}
