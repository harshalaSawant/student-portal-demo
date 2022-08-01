import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
// import { students } from '../../assets/student-data/student-grades';
import * as students from '../../assets/student-data/stud-grades.json';
import { IStudentDetail, IStudentGrade } from '../interfaces/tabs.interface';
export interface GradePercent {
  grade: number;
  value: number;
}
@Injectable({
  providedIn: 'root'
})
export class StudentDetailsService {

  studentData: IStudentDetail[] = [];
  scoreChanged: Subject<any> = new Subject();

  constructor(private _http: HttpClient) { }

  getData() {
    return this._http.get('../../assets/student-data/stud-grades.json');
    // return of(this.studentData);
  }
  changeScore(id: number, sub: string, newScore: number) {
    const ind = this.studentData.findIndex((x: IStudentDetail) => x.id === id);
    const subInd = this.studentData[ind].performance.findIndex((x: IStudentGrade) => x.subject === sub);
    this.studentData[ind].performance[subInd].score = newScore;

    this.scoreChanged.next(this.studentData);
  }
  saveNewScores(newScores: any[]) {
    this.studentData = JSON.parse(JSON.stringify(newScores));
    this.scoreChanged.next(this.studentData);
  }
}
