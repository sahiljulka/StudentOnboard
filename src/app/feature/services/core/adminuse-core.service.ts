import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Student } from "../../models/Student";
import { map } from "rxjs/operators";

@Injectable()
export class AdminuseCoreService {
  students: Array<Student> = [];
  constructor(private _http: HttpClient) {
    this.students = this.getStudents() || [];
  }

  public getDocumentsPair(): Observable<any> {
    return this._http.get("../../../../assets/docskeyvaluepairs.json");
  }

  public getDomesticDocs(): Observable<any> {
    return this._http.get("../../../../assets/domesticdocs.json");
  }

  public getInternatinalDocs(): Observable<any> {
    return this._http.get("../../../../assets/internationaldocs.json");
  }

  public addStudent(student: Student) {
    //let students: Array<Student> = this.getStudents();
    if (!this.students || this.students.length == 0) {
      student.id = 1;
    } else student.id = this.students[this.students.length - 1].id + 1;
    this.students.push(student);
    this.setStudents();
  }

  public getStudentObs(): Observable<Student[]> {
    return of(this.students);
  }

  public getStudents(): Array<Student> {
    let students = localStorage.getItem("students");
    return JSON.parse(students);
  }

  public deleteStudent(id: number) {
    //let students: Array<Student> = this.getStudents();
    let student = this.students.filter(a => a.id == id)[0];
    let index = this.students.indexOf(student);
    if (index != -1) {
      this.students.splice(index, 1);
    }
    // let studentIndex = this.students.findIndex(student => student.id == id);
    // this.students[studentIndex].isDeleted = true;
    this.setStudents();
  }

  public editStudent(studentEdit: Student) {
    // let students: Array<Student> = this.getStudents();
    let studentIndex = this.students.findIndex(
      student => student.id == studentEdit.id
    );
    this.students[studentIndex] = studentEdit;
    this.setStudents();
  }

  private setStudents() {
    localStorage.setItem("students", JSON.stringify(this.students));
  }
}
