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