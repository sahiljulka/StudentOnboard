import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { UserService } from "../user.service";
import { Router } from "@angular/router";

/**
 * This guars ensures that is a user is logged in he can't access the login page
 * And same goes if the user is not logged in than he can't access the home page
 */
@Injectable({
  providedIn: "root"
})
export class UserGuardService implements CanActivate {
  constructor(public _userService: UserService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let isLoggedIn = this._userService.isLoggedIn();
    if (state.url === "/login") {
      if (isLoggedIn) {
        return false;
      } else {
        return true;
      }
    } else if (state.url === "/") {
      if (isLoggedIn) {
        return true;
      } else {
        this.router.navigate(["login"]);
        return false;
      }
    }
    if (this._userService.isLoggedIn()) return false;
    return true;
  }
}
