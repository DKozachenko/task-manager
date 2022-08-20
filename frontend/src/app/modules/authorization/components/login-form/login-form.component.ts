import { IToken } from '../../models/interfaces';
import { IResponse } from './../../../shared/models/interfaces/response.interface';
import { ILoginInfo } from './../../models/interfaces/login-info.interface';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ControlsOf, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { AuthorizationService } from './../../store/authorization.service';
import { catchError, of } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'authorization-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass'],
})
export class LoginFormComponent {
  /** Форма входа */
  public form: FormGroup<ControlsOf<ILoginInfo>> = new FormGroup<
    ControlsOf<ILoginInfo>
  >({
    nickname: new FormControl('', [
      Validators.required,
      Validators.maxLength(60),
      Validators.pattern('^[A-Za-z0-9]+$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(60),
      Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}'),
    ]),
  });

  /** Видимость пароля */
  public passwordVisible: boolean = false;

  constructor(
    private authorizationService: AuthorizationService,
    private notificationService: NzNotificationService,
    private readonly router: Router
  ) {}

  /**
   * Вход
   */
  public login() {
    this.form.disable();
    const loginInfo: ILoginInfo = this.form.value;

    this.authorizationService.login(loginInfo)
      .pipe(
        catchError((response: HttpErrorResponse) => {
          return of({
            data: undefined,
            error: true,
            message: response.error.message,
          });
        })
      )
      .subscribe((response: IResponse<IToken | undefined>) => {
        this.form.enable();
        if (response.error) {
          this.notificationService.error('Ошибка', response.message ?? '');
        } else {
          this.notificationService.success('Успешно', 'Вы вошли');
          this.form.reset();
          this.router.navigate(['/dashboard/tasks']);
        }
      });
  }
}
