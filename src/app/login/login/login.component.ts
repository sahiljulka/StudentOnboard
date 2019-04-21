import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/core/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _userService: UserService,
    private fb: FormBuilder,
    private _router: Router
  ) {
    this.form = fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {}

  get username() {
    return this.form.get("username");
  }

  get password() {
    return this.form.get("password");
  }

  public onsubmit() {
    this._userService.login(this.username.value, this.password.value);
    this._router.navigate([""]);
  }
}
