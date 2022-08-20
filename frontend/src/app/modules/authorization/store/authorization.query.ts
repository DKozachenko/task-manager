import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AuthorizationStore } from '.';
import { AuthorizationState } from '../models/states';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationQuery extends Query<AuthorizationState> {
  constructor(protected override store: AuthorizationStore) {
    super(store);
  }

  /** Есть ли токен */
  public get hasToken(): boolean {
    return !!this.getValue().token;
  }

  /** Получение токена */
  public get getToken(): string {
    return this.getValue().token ?? '';
  }
}
