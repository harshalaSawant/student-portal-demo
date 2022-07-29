import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { asyncScheduler, of, Subject } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { StudentDetailsService } from 'src/app/services/student-details.service';

import { GradesDetailComponent } from './grades-detail.component';

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

describe('GradesDetailComponent', () => {
  let component: GradesDetailComponent;
  let fixture: ComponentFixture<GradesDetailComponent>;
  let service;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradesDetailComponent ],
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
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(GradesDetailComponent);
      service = TestBed.inject(StudentDetailsService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should call getData and return list of users", (() => {
    const task = () => console.log('it works!');
    asyncScheduler.schedule(task, 2000);
    component.grade = 1;
    const response = [{
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
      id: 102,
      name: 'Luna Lovegood',
      grade: 1,
      email: 'll@school.com',
      performance: [
        {
          subject: 'Maths',
          score: 100
        },
        {
          subject: 'Science',
          score: 90
        },
        {
          subject: 'Social',
          score: 95
        },
        {
          subject: 'English',
          score: 90
        },
        {
          subject: 'French',
          score: 90
        }
      ],
      result: 'Pass'
    }];
    spyOn(service, 'getData').and.callThrough(); //.returnValue(of(response))


    component.displayDetails();

    fixture.detectChanges();
  
    // expect(homeComponent.listOfUsers).toEqual(response);
  }));
  it("should call showButtons", (() => {
    component.grade = 1;
    spyOn(service, 'getData').and.callThrough(); //.returnValue(of(response))
    component.showActionButtons = false;
    component.showButtons(true);

    fixture.detectChanges();
  
    expect(component.showActionButtons).toEqual(true);
  }));
  it("should call cancelSave", (() => {
    component.showActionButtons = true;
    component.grade = 1;
    component.initData = [{
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
    }];
    component.newScores = [];
    component.cancelSave();
    fixture.detectChanges();
  
    expect(component.newScores).toEqual(component.initData);
    expect(component.showActionButtons).toEqual(false);
  }));
  it("should call scoreChange", (() => {
    component.grade = 1;
    spyOn(service, 'getData').and.callThrough(); //.returnValue(of(response))
    component.showActionButtons = true;
    
    component.newScores = [{
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
    }];
    component.scoreChange(101, 'Maths', {target: {innerText: '55'}});
    fixture.detectChanges();
  
    expect(component.newScores).toEqual([{
      id: 101,
      name: 'Ginny Weasley',
      grade: 1,
      email: 'gw@school.com',
      performance: [
        {
          subject: 'Maths',
          score: 55
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
    }]);
  }));
  it("should call saveChanges", (() => {
    component.grade = 1;
    spyOn(service, 'getData').and.callThrough(); //.returnValue(of(response))
    component.showActionButtons = true;
    
    component.newScores = [{
      id: 101,
      name: 'Ginny Weasley',
      grade: 1,
      email: 'gw@school.com',
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
          score: 80
        }
      ],
      result: 'Pass'
    }];
    component.saveChanges();
    fixture.detectChanges();

    expect(component.showActionButtons).toEqual(false);
  }));
});
