import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor() {}

  /**
   * To set the info of logegd user in localstorage
   */
  public login(username: string, password: string) {
    localStorage.setItem(
      "user",
      JSON.stringify({ username: username, password: password })
    );
  }

  public logout() {
    localStorage.removeItem("user");
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem("user") !== null;
  }

  public userName(): string {
    let obj = JSON.parse(localStorage.getItem("user"));
    return obj.username;
  }
}
