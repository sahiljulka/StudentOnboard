import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Student } from "../../models/Student";

@Component({
  selector: "app-edit-view-student-dialog",
  templateUrl: "./edit-view-student-dialog.component.html",
  styleUrls: ["./edit-view-student-dialog.component.scss"]
})
export class EditViewStudentDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditViewStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onSubmit(student: Student) {
    this.dialogRef.close(student);
  }
}
