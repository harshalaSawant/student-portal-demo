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
  grade: string;
  email: string;
  performance: Array<IStudentGrade>;
}