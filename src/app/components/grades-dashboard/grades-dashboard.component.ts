import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { IStudentDetail, IStudentGrade } from 'src/app/interfaces/tabs.interface';
import { StudentDetailsService } from 'src/app/services/student-details.service';

@Component({
  selector: 'app-grades-dashboard',
  templateUrl: './grades-dashboard.component.html',
  styleUrls: ['./grades-dashboard.component.scss']
})
export class GradesDashboardComponent implements OnInit {

  options: EChartsOption = {
    title: {
      text: 'Gradewise Student Perfomance'
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      }
    },
    series: [
      {
        data: [],
        type: 'pie',
      },
    ],
    tooltip: {}
  };
  chartData: any[] = [];

  constructor(private _studentDetails: StudentDetailsService,
              private route: Router) { }

  ngOnInit(): void {
    this.getChartData();
  }
  
  getChartData() {
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
    const grades = [... new Set<number>(data.map((obj: IStudentDetail) => { return obj.grade }))];
        for (let i = 0; i < grades.length; i++) {
          const gradeData = data.filter((x: IStudentDetail) => x.grade === grades[i]);
          this.calculatePassPercent(gradeData, gradeData.length, grades[i]);
        }
        this.options.series = [{ data: this.chartData, type: 'pie' }];
        console.log('ChartData', this.chartData);
  }
  calculatePassPercent(data: any[], noOfStudents: number, grade: number) {
    const fail = data.filter(x => {
      if (x.performance) {
        return x.performance.find((y: { score: number; }) => y.score < 35);
      } else {
        let arr: number[] = Object.values(x);
        return arr.filter(y => typeof y === 'number' && y<35);
      }
    })
    const passPercent = ((noOfStudents - fail.length) / noOfStudents) * 100;
    this.chartData.push({ name: 'Grade ' + grade, value: passPercent, grade: grade });
  }

  onChartClick(event: any) {
    this.route.navigateByUrl(`${'/gradesDetail/' + event.data.grade}`);
  }
  updateChart() {
    this._studentDetails.scoreChanged.subscribe(data => {
      this.transformData();
    });
  }
}
