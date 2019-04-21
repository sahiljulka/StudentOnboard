import { Component, OnInit } from "@angular/core";
import { AdminuseUiService } from "../services/ui/adminuse-ui.service";
import { Student } from "../models/Student";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-onboarduser",
  templateUrl: "./onboarduser.component.html",
  styleUrls: ["./onboarduser.component.scss"]
})
export class OnboarduserComponent implements OnInit {
  constructor(
    private _adminUseService: AdminuseUiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  public onSubmit(studentObj: Student) {
    this._adminUseService.addStudent(studentObj);
    this.snackBar.open("Student has been added", "Dismiss", {
      duration: 2000
    });
  }
}
