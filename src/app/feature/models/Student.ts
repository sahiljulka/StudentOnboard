import { StudentCategory } from "../enums/StudentCategory";

export class Student {
  id: number;
  category: StudentCategory;
  name: string;
  documents: Array<number>;
  DOB: Date;
  FatherName: string;
  MotherName: string;
  LastClassScore: number;
  /**
   *
   */
  constructor(data) {
    this.DOB = data.dob;
    this.name = data.name.trim();
    this.FatherName = data.fathername.trim();
    this.MotherName = data.mothername.trim();
    this.category = data.category;
    this.documents = data.documentslist;
    this.LastClassScore = data.lastclassscore;
  }
}
