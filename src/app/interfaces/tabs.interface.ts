export interface TabsInterface {
  name: string;
  id: number;
  route: string;
}

export interface IStudentGrade {
  score: number;
  subject: string;
}

export interface IStudentDetail {
  id: number;
  name: string;
  grade: number;
  email: string;
  performance: Array<IStudentGrade>;
}

// Mat table data helper interface
export interface IStudentTableFormat {
  id: number;
  grade?: number;
  name: string;
  email: string;
  Maths: number;
  English: number;
  French: number;
  Science: number;
  Social: number;
}