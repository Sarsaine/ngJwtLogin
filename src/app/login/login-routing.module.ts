import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
