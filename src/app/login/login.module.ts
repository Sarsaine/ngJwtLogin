import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginService} from "./services/login.service";
import {LoginComponent} from "./components/login/login.component";
import {LoginRoutingModule} from "./login-routing.module";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginService,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule {
}
