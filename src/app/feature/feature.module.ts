import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { OnboarduserComponent } from "./onboarduser/onboarduser.component";
import { UserGuardService } from "../core/guards/guard.service";
import { ListusersComponent } from "./listusers/listusers.component";
import { AdminComponent } from "./admin/admin.component";
import { ChilduserlistComponent } from "./childuserlist/childuserlist.component";
import { AdminuseCoreService } from "./services/core/adminuse-core.service";
import { HttpClientModule } from "@angular/common/http";
import { AdminuseUiService } from "./services/ui/adminuse-ui.service";
import { ReactiveFormsModule } from "@angular/forms";
import { DeleteStudentDialogComponent } from "./childuserlist/delete-student-dialog/delete-student-dialog.component";
import { StudentformComponent } from "./admin/studentform/studentform.component";
import { EditViewStudentDialogComponent } from "./childuserlist/edit-view-student-dialog/edit-view-student-dialog.component";
import { SearchpipePipe } from "./pipes/searchpipe.pipe";

const Routes = [
  {
    path: "",
    pathMatch: "full",
    component: AdminComponent,
    canActivate: [UserGuardService]
  }
];

@NgModule({
  declarations: [
    OnboarduserComponent,
    ListusersComponent,
    AdminComponent,
    ChilduserlistComponent,
    DeleteStudentDialogComponent,
    StudentformComponent,
    EditViewStudentDialogComponent,
    SearchpipePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(Routes),
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [AdminuseCoreService, AdminuseUiService],
  entryComponents: [
    DeleteStudentDialogComponent,
    EditViewStudentDialogComponent
  ]
})
export class FeatureModule {}

/**
 * This module deals with most functinality in the app
 */
