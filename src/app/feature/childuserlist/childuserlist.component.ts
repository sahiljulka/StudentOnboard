import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Student } from "../models/Student";
import { MatDialog } from "@angular/material";
import { DeleteStudentDialogComponent } from "./delete-student-dialog/delete-student-dialog.component";
import { EditViewStudentDialogComponent } from "./edit-view-student-dialog/edit-view-student-dialog.component";

@Component({
  selector: "app-childuserlist",
  templateUrl: "./childuserlist.component.html",
  styleUrls: ["./childuserlist.component.scss"]
})
export class ChilduserlistComponent implements OnInit {
  @Input("student") student: Student;
  @Output("deleteStudent") deleteStudent: EventEmitter<
    number
  > = new EventEmitter();
  @Output("editStudent") editStudent: EventEmitter<
    Student
  > = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  /**
   * To open the delete dialog box to be shown to user
   */
  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteStudentDialogComponent, {
      width: "300px",
      data: { name: this.student.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deleteStudent.emit(this.student.id);
    });
  }

  /**
   * To open dialog box to view or edit the user document
   */
  openViewEditDialog(editflag: boolean): void {
    const dialogRef = this.dialog.open(EditViewStudentDialogComponent, {
      width: "40%",
      data: { value: this.student, editflag: editflag }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!editflag || !result) return;
      this.editStudent.emit(result);
    });
  }
}
