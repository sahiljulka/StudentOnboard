import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { UserGuardService } from "../core/guards/guard.service";
import { ReactiveFormsModule } from "@angular/forms";

const Routes = [
  {
    path: "",
    component: LoginComponent,
    pathMatch: "full",
    canActivate: [UserGuardService]
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class LoginModule {}

/**
 * Responsible for dealing with the login in application
 */
