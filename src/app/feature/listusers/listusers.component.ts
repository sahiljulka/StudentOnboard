import { Component, OnInit } from "@angular/core";
import { StudentType } from "../models/StudentType";
import { StudentCategory } from "../enums/StudentCategory";
import { Student } from "../models/Student";
import { AdminuseUiService } from "../services/ui/adminuse-ui.service";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-listusers",
  templateUrl: "./listusers.component.html",
  styleUrls: ["./listusers.component.scss"]
})
export class ListusersComponent implements OnInit {
  selectedcategory: StudentCategory;
  students$: Observable<Student[]>;
  studentTypes: StudentType[] = [
    { value: StudentCategory.Domestic, viewValue: "Domestic" },
    { value: StudentCategory.International, viewValue: "International" },
    { value: 0, viewValue: "All " }
  ];

  constructor(
    private _adminUseService: AdminuseUiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.selectedcategory = 0;
    this.students$ = this._adminUseService.getStudents();
  }

  deleteStudent(id) {
    this._adminUseService.deleteStudent(id);
  }

  editStudent(student: Student) {
    this.snackBar.open("Student has been edited", "Dismiss", {
      duration: 2000
    });
    this._adminUseService.editStudent(student);
  }
}
