import { AuthorizationStore } from '.';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RestService } from '../../shared/services';
import { IToken } from '../../shared/models/interfaces';
import { ILoginUser, IUser } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private restService: RestService,
              private authorizationStore: AuthorizationStore) {}

  /**
   * Регистрация нового пользователя
   * @param newUser - новый пользователь
   * @returns созданного в БД пользователя
   */
  public register(newUser: IUser): Observable<IUser> {
    return this.restService.add<IUser>('auth/register', newUser);
  }

  /**
   * Вход в систему
   * @param loginUser объект с данными для выполнения входа
   * @returns токен
   */
  public login(loginUser: ILoginUser): Observable<IToken> {
    return this.restService.add<IUser, IToken>('auth/login', loginUser)
      .pipe(
        map((token: IToken) => {
          this.authorizationStore.update(token);
          return token;
        })
      );
  }

  /**
   * Выход из системы
   */
  public logout(): void {
    this.authorizationStore.update({
      token: undefined
    });
  }
}
