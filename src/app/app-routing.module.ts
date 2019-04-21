import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

/**
 * For lazy loading in Application
 */
const routes: Routes = [
  {
    path: "login",
    loadChildren: "./login/login.module#LoginModule"
  },
  {
    path: "",
    loadChildren: "./feature/feature.module#FeatureModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
