import { Component } from "@angular/core";
import { UserService } from "./core/user.service";
import { Router } from "@angular/router";

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private _userService: UserService, private _router: Router) {}

  /**
   * To log off the user
   */
  logout() {
    this._userService.logout();
    this._router.navigate(["/login"]);
  }

  get username() {
    return this._userService.userName();
  }

  get isLoggedIn() {
    return this._userService.isLoggedIn();
  }
}
