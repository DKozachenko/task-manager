import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ControlsOf, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError, of } from 'rxjs';
import { IResponse } from './../../../shared/models/interfaces/response.interface';
import { IUser } from '../../models/interfaces';
import { AuthorizationService } from '../../store';

@Component({
  selector: 'authorization-register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {
  /** Форма регистрации */
  public form: FormGroup<ControlsOf<IUser>> = new FormGroup<ControlsOf<IUser>>({
    fullName: new FormControl('', [
      Validators.required,
      Validators.maxLength(60),
      Validators.pattern('^[А-Яа-яA-Za-z]+$'),
    ]),
    mail: new FormControl('', [
      Validators.required,
      Validators.maxLength(60),
      Validators.email,
    ]),
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

  constructor(
    private authorizationService: AuthorizationService,
    private notificationService: NzNotificationService
  ) {}

  /**
   * Регистрация
   */
  public register() {
    this.form.disable();
    const newUser: IUser = {
      ...this.form.value,
      dateRegistration: undefined,
      taskIds: [],
      labelIds: []
    };

    this.authorizationService.register(newUser)
      .pipe(
        catchError((response: HttpErrorResponse) => {
          return of({
            data: undefined,
            error: true,
            message: response.error.message,
          });
        })
      )
      .subscribe((response: IResponse<IUser | undefined>) => {
        this.form.enable();
        if (response.error) {
          this.notificationService.error('Ошибка', `Ошибка при регистрации: ${response.message ?? ''}`);
        } else {
          this.notificationService.success('Успешно', 'Вы зарегистрировались');
          this.form.reset();
        }
      });
  }
}
