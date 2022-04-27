import {Component, OnInit} from '@angular/core';
import {LoginService} from "app/login/services/login.service";
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    readonly loginService: LoginService,
    private router: Router,
    private loadingController: LoadingController,
  ) {
  }

  ngOnInit() {
  }

  onLogin() {
    if (this.loginService.isLogged$.value)
      return this.onLogout();
    this.router.navigate(['login']);
  }

  async onLogout() {
    const loading = await this.loadingController.create({
      message: 'Logout...'
    });

    await loading.present();

    const sub = this.loginService.logout().subscribe(
      () => {
      },
      () => {
      },
      () => {
        loading.dismiss();
        sub.unsubscribe();
      }
    );
  }
}
