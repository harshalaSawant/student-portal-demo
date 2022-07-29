import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { IStudentDetail } from 'src/app/interfaces/tabs.interface';
import { StudentDetailsService } from 'src/app/services/student-details.service';

@Component({
  selector: 'app-grades-detail',
  templateUrl: './grades-detail.component.html',
  styleUrls: ['./grades-detail.component.scss']
})
export class GradesDetailComponent implements OnInit {
  grade: any;
  data: any = [];
  columns: string[] = [];
  displayedColumns: string[] = [];
  showActionButtons= false;
  initData: any[] = [];
  newScores: any[] = [];

  constructor(private _studentDetails: StudentDetailsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.grade = +params['id'];
      this.displayDetails();
    });
  }
  displayDetails() {
    this._studentDetails.getData().subscribe(data => {
      const filteredData = data.filter(x => x.grade === this.grade);
      let modifiedData: any[] = [];
      filteredData.forEach(student => {
        const obj : IStudentDetail = {id: 0, name: '', email: '', grade: '', performance: []};
        obj.id = student.id;
        obj.name = student.name;
        obj.email = student.email;
        student.performance.forEach(sub => {
          obj[sub.subject] = student.performance.find(x=> x.subject === sub.subject).score;
        });
        modifiedData.push(obj);
      })
      console.log(modifiedData);
      if (modifiedData[0]) {
        this.columns = Object.keys(modifiedData[0]);
        this.displayedColumns = Object.keys(modifiedData[0]);
      }
      
      this.data = new MatTableDataSource(modifiedData);
      this.initData = JSON.parse(JSON.stringify(data));
      this.newScores = JSON.parse(JSON.stringify(data));
    });
  }
  scoreChange(id: number, subject: string, event: any) { // tested
    this.showButtons(true);
    // this._studentDetails.changeScore(id, subject, +event.target.innerText);
    this.changeScore(id, subject, +event.target.innerText);
  }
  showButtons(event: any) { // tested
    this.showActionButtons = event;
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

  changeScore(id: number, sub: any, newScore: number) {
    const ind = this.newScores.findIndex(x => x.id === id);
    const subInd = this.newScores[ind].performance.findIndex(x => x.subject === sub);
    this.newScores[ind].performance[subInd].score = newScore;
  }
}
