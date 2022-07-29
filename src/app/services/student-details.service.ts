import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { students } from '../../assets/student-data/student-grades';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailsService {

  studentData = students;
  scoreChanged: Subject<any> = new Subject();

  constructor() { }

  getData() {
    return of(this.studentData);
  }
  changeScore(id: number, sub: string, newScore: number) {
    const ind = this.studentData.findIndex(x => x.id === id);
    const subInd = this.studentData[ind].performance.findIndex(x => x.subject === sub);
    this.studentData[ind].performance[subInd].score = newScore;

    this.scoreChanged.next(this.studentData);
  }
  saveNewScores(newScores: any[]) {
    this.studentData = JSON.parse(JSON.stringify(newScores));
    this.scoreChanged.next(this.studentData);
  }
}
