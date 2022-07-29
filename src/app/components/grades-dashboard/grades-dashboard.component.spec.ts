import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject, of, asyncScheduler } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { StudentDetailsService } from 'src/app/services/student-details.service';

import { GradesDashboardComponent } from './grades-dashboard.component';

const MockStudentService: StudentDetailsService = {
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
  getData: () => {return of([
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
  ])},
  changeScore: () => {},
  saveNewScores: () => {}
}

describe('GradesDashboardComponent', () => {
  let component: GradesDashboardComponent;
  let fixture: ComponentFixture<GradesDashboardComponent>;
  let service;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradesDashboardComponent ],
      imports: [RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule],
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
    expect(component.firstGradeData.length).toBeGreaterThan(0);
  });
  it('should call onChartClick', () => {
    component.onChartClick({data: {grade: 1}});
  });

});
