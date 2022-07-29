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

  firstGradeData: Array<IStudentDetail> = [];
  firstGradePassPercent = 0;
  secondGradeData: Array<IStudentDetail> = [];
  secondGradePassPercent = 0;
  thirdGradeData: Array<IStudentDetail> = [];
  thirdGradePassPercent = 0;
  options: EChartsOption = {
    title: {
      text: 'Gradewise Student Perfomance'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      type: 'value'
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
    this._studentDetails.getData().subscribe((data) => {
      // this.chartData = data;
      // let subjArr = Object.values(data[0].performance);
      // let subjs: string[] = [];
      // subjArr.forEach(e => subjs.push(e.subject))
      // console.log(subjs);
      // let formattedData = data;

      // // data.forEach(student => {
      // //   let obj = {...student};

      // //   subjs.forEach((sub: string) => {
      // //     obj.performance = student?.performance.find(x => x?.subject === sub)?.score || 0;
      // //   });
      // //   formattedData.push(obj);
      // // });
      // // console.log(formattedData);
      const grades = [... new Set(data.map(obj => {return obj.grade}))];
      for (let i = 0; i < grades.length; i++) {
        const gradeData = data.filter(x => x.grade === +grades[i]);
        this.calculatePassPercent(gradeData, gradeData.length, +grades[i]);
      }
      this.options.series = [{ data: this.chartData, type: 'pie' }];
      console.log('ChartData', this.chartData);
    });
  }

  calculatePassPercent(data: IStudentDetail[], noOfStudents: number, grade: number) {

    // this.firstGradeData = data.filter(x => x.grade === 1);
    // const fail = this.firstGradeData.filter(x => {
    const fail = data.filter(x => {
      return x.performance.find(y => y.score < 35);
    });
    const passPercent = ((noOfStudents - fail.length) / noOfStudents) * 100;
    this.chartData.push({ name: 'Grade ' + grade, value: passPercent, grade: grade});
    this._studentDetails.saveGradePercent({grade: grade, value: passPercent})

    // this.secondGradeData = data.filter(x => x.grade === 2);
    // const sfail = this.secondGradeData.filter(x => {
    //   return x.performance.find(y => y.score < 35);
    // });
    // this.secondGradePassPercent = ((this.secondGradeData.length - sfail.length) / this.secondGradeData.length) * 100;
    // this.chartData.push({ name: 'Second Grade', value: this.secondGradePassPercent, grade: 2 });

    // this.thirdGradeData = data.filter(x => x.grade === 3);
    // const tfail = this.thirdGradeData.filter(x => {
    //   return x.performance.find(y => y.score < 35);
    // });
    // this.thirdGradePassPercent = ((this.thirdGradeData.length - tfail.length) / this.thirdGradeData.length) * 100;

    // this.chartData.push({ name: 'Third Grade', value: this.thirdGradePassPercent, grade: 3 });

    
  }

  onChartClick(event: any) {
    this.route.navigateByUrl(`${'/gradesDetail/' + event.data.grade}`);
  }
  updateChart() {
    this._studentDetails.scoreChanged.subscribe(data => {
      this.getChartData();
    })
  }
}
