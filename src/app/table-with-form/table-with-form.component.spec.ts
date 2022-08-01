import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { asyncScheduler, of, Subject } from 'rxjs';
import { StudentDetailsService } from '../services/student-details.service';
import { TableWithFormComponent } from './table-with-form.component';

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
describe('TableWithFormComponent', () => {
  let component: TableWithFormComponent;
  let fixture: ComponentFixture<TableWithFormComponent>;
  let service: StudentDetailsService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableWithFormComponent ],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWithFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(StudentDetailsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should call getData and return list of users", (() => {
    const task = () => console.log('getting formatted data for table');
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
    spyOn(service, 'getData').and.returnValue(of(response))


    component.getData();

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
      ]
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
      ]
    }];
    component.scoreChange(101, 'subject', 'Maths', {target: {value: 55}});
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
      ]
    }]);
  }));
  it("should call scoreChange for name change", (() => {
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
      ]
    }];
    component.scoreChange(101, 'name', '', {target: {value: "G W"}});
    fixture.detectChanges();
  
    expect(component.newScores).toEqual([{
      id: 101,
      name: 'G W',
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
      ]
    }]);
  }));
  it("should call scoreChange for email change", (() => {
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
      ]
    }];
    component.scoreChange(101, 'email', '', {target: {value: "gweasley@school.com"}});
    fixture.detectChanges();
  
    expect(component.newScores).toEqual([{
      id: 101,
      name: 'Ginny Weasley',
      grade: 1,
      email: 'gweasley@school.com',
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
      ]
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
      ]
    }];
    component.saveChanges();
    fixture.detectChanges();

    expect(component.showActionButtons).toEqual(false);
  }));
});


