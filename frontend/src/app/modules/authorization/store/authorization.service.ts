import { Injectable } from '@angular/core';
import { AuthorizationStore } from '.';
import { map, Observable } from 'rxjs';
import { RestService } from '../../shared/services';
import { IResponse, IToken } from '../../shared/models/interfaces';
import { ILoginInfo, IUser } from '../models/interfaces';

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
  public register(newUser: IUser): Observable<IResponse<IUser>> {
    return this.restService.add<IUser>('auth/register', newUser);
  }

  /**
   * Вход в систему
   * @param loginInfo объект с данными для выполнения входа
   * @returns токен
   */
  public login(loginInfo: ILoginInfo): Observable<IResponse<IToken>> {
    return this.restService.add<IUser, IToken>('auth/login', loginInfo)
      .pipe(
        map((response: IResponse<IToken>) => {
          this.authorizationStore.update(response.data);
          return response;
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
