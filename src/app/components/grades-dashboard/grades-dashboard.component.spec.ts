import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject, of, asyncScheduler } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { GradePercent, StudentDetailsService } from 'src/app/services/student-details.service';

import { GradesDashboardComponent } from './grades-dashboard.component';

const MockStudentService = {
  studentData: [
    {
      id: 101,
      name: 'Ginny Weasley',
      grade: 1,
      email: 'gw@school.com',
      performance: [
        {
          subject: 'Maths',
          score: 100
        },
        {
          subject: 'Science',
          score: 80
        },
        {
          subject: 'Social',
          score: 80
        },
        {
          subject: 'English',
          score: 80
        },
        {
          subject: 'French',
          score: 90
        }
      ],
      result: 'Pass'
    },
    {
      id: 201,
      name: 'Harry Potter',
      grade: 2,
      email: 'hp@school.com',
      performance: [
        {
          subject: 'Maths',
          score: 80
        },
        {
          subject: 'Science',
          score: 80
        },
        {
          subject: 'Social',
          score: 80
        },
        {
          subject: 'English',
          score: 80
        },
        {
          subject: 'French',
          score: 65
        }
      ],
      result: 'Pass'
    },
    {
      id: 301,
      name: 'Angelina Johnson',
      grade: 3,
      email: 'aj@school.com',
      performance: [
        {
          subject: 'Maths',
          score: 95
        },
        {
          subject: 'Science',
          score: 80
        },
        {
          subject: 'Social',
          score: 80
        },
        {
          subject: 'English',
          score: 95
        },
        {
          subject: 'French',
          score: 85
        }
      ],
      result: 'Pass'
    }
  ],
  scoreChanged: new Subject(),
  getData: () => {
    return of([
      {
        id: 101,
        name: 'Ginny Weasley',
        grade: 1,
        email: 'gw@school.com',
        performance: [
          {
            subject: 'Maths',
            score: 100
          },
          {
            subject: 'Science',
            score: 80
          },
          {
            subject: 'Social',
            score: 80
          },
          {
            subject: 'English',
            score: 80
          },
          {
            subject: 'French',
            score: 90
          }
        ],
        result: 'Pass'
      },
      {
        id: 201,
        name: 'Harry Potter',
        grade: 2,
        email: 'hp@school.com',
        performance: [
          {
            subject: 'Maths',
            score: 80
          },
          {
            subject: 'Science',
            score: 80
          },
          {
            subject: 'Social',
            score: 80
          },
          {
            subject: 'English',
            score: 80
          },
          {
            subject: 'French',
            score: 65
          }
        ],
        result: 'Pass'
      },
      {
        id: 301,
        name: 'Angelina Johnson',
        grade: 3,
        email: 'aj@school.com',
        performance: [
          {
            subject: 'Maths',
            score: 95
          },
          {
            subject: 'Science',
            score: 80
          },
          {
            subject: 'Social',
            score: 80
          },
          {
            subject: 'English',
            score: 95
          },
          {
            subject: 'French',
            score: 85
          }
        ],
        result: 'Pass'
      }
    ]);
  },
  changeScore: () => { },
  saveNewScores: () => { },
  saveGradePercent: () => { },
  getGradePercent: () => { return { grade: 1, value: 60 }; },
  getFormattedData: () => {
    return of([
      {
        "id": 101,
        "grade": 1,
        "name": "Ginny Weasley",
        "email": "gw@school.com",
        "Maths": 100,
        "English": 80,
        "French": 90,
        "Science": 80,
        "Social": 80
      },
      {
        "id": 201,
        "grade": 2,
        "name": "Harry Potter",
        "email": "hp@school.com",
        "Maths": 80,
        "English": 80,
        "French": 65,
        "Science": 80,
        "Social": 80
      },
      {
        "id": 401,
        "grade": 3,
        "name": "Angelina Johnson",
        "email": "aj@school.com",
        "Maths": 95,
        "English": 95,
        "French": 85,
        "Science": 80,
        "Social": 80
      }
    ]);
  }
}

describe('GradesDashboardComponent', () => {
  let component: GradesDashboardComponent;
  let fixture: ComponentFixture<GradesDashboardComponent>;
  let service: StudentDetailsService;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradesDashboardComponent ],
      imports: [RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        HttpClientTestingModule],
      providers: [
        {provide: StudentDetailsService, useValue: MockStudentService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesDashboardComponent);
    service = TestBed.inject(StudentDetailsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOninit', () => {
    const task = () => console.log('Calling scheduler');
    asyncScheduler.schedule(task, 2000);
    spyOn(service, 'getData').and.callThrough();

    component.ngOnInit();
    expect(component.chartData.length).toBeGreaterThan(0);
  });
  it('should initialize studentdata of student detail service', () => {
    const task = () => console.log('Calling scheduler');
    asyncScheduler.schedule(task, 2000);
    service.studentData = [];
    spyOn(service, 'getData').and.callThrough();

    component.getChartData();
    expect(service.studentData.length).toBeGreaterThan(0);
  })

});
