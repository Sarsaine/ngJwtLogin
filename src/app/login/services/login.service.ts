import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {LoginFormInterface} from "../interfaces/loginForm.interface";
import {HttpClient} from "@angular/common/http";
import {delay, tap, switchMap} from "rxjs/operators";
import {LoginStatusEnum} from "../enums/login-status-enum";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLogged$ = new BehaviorSubject<boolean>(false);
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
  ) {
  }

  login(loginInfo: LoginFormInterface): Observable<LoginStatusEnum> {
    this.isLoading$.next(true);

    return of(loginInfo.login).pipe(
      delay(1000),
      switchMap(login => {
        switch (login) {
          case 'ok':
            return of(LoginStatusEnum.SUCCESS);
          case 'offline':
            return of(LoginStatusEnum.SERVER_NOT_FOUND);
          case 'error':
            return of(LoginStatusEnum.SERVER_ERROR);
        }

        return of(LoginStatusEnum.WRONG_LOGIN_PASSWORD);
      }),
      tap(loginStatus => {
        this.isLoading$.next(false);
        if (loginStatus == LoginStatusEnum.SUCCESS) {
          this.isLogged$.next(true);
        }
      }));
  }

  logout(): Observable<void> {
    return of(void 0).pipe(
      delay(1000),
      tap(() => {
        this.isLoading$.next(false);
        this.isLogged$.next(false);
      }));
  }
}
