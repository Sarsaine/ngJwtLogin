import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {LoginStatusEnum} from "../../enums/login-status-enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    readonly loginService: LoginService,
    private router: Router,
    private toastController: ToastController,
  ) {
  }

  ngOnInit() {
  }

  login() {
    const sub = this.loginService.login({
      login: this.form.get('login').value,
      password: this.form.get('password').value,
    }).subscribe(async state => {
        if (state == LoginStatusEnum.SUCCESS) {
          await this.router.navigate(['home']);
          this.form.reset();
        } else {
          let message = null;

          switch (state) {
            case LoginStatusEnum.SERVER_NOT_FOUND:
              message = 'Server cannot be found.';
              break;
            case LoginStatusEnum.SERVER_ERROR:
              message = 'An error has been occured. Please retry later.';
              break;
            case LoginStatusEnum.WRONG_LOGIN_PASSWORD:
              message = 'Bad login or password.';
              break;
          }
          if (message) {
            const toast = await this.toastController.create({
              message,
              duration: 2000
            });
            await toast.present();
          }

        }
      },
      () => {
      },
      () => {
        sub.unsubscribe();
      }
    );
  }
}
