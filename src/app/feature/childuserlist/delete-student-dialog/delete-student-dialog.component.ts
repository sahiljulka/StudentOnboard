import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-delete-student-dialog",
  templateUrl: "./delete-student-dialog.component.html",
  styleUrls: ["./delete-student-dialog.component.scss"]
})
export class DeleteStudentDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onClick(isDeleted: boolean) {
    this.dialogRef.close(isDeleted);
  }
}
