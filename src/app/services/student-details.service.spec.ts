import { TestBed } from '@angular/core/testing';

import { StudentDetailsService } from './student-details.service';

describe('StudentDetailsService', () => {
  let service: StudentDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call changeScore', () => {
    service.studentData = [
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
    ];
    service.changeScore(101, 'Maths', 78);

    expect(service.studentData[0].performance.find(x => x.subject === 'Maths').score).toEqual(78);
  });
  it('should call saveNewScores', () => {
    service.studentData = [
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
    ];
    service.saveNewScores([
      {
        id: 101,
        name: 'Ginny Weasley',
        grade: 1,
        email: 'gw@school.com',
        performance: [
          {
            subject: 'Maths',
            score: 75
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

    expect(service.studentData[0].performance.find(x => x.subject === 'Maths').score).toEqual(75);
  });
});
