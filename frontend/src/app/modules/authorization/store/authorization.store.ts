import { AuthorizationState } from './../models/states/authorization.state';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Стор авторизации
 */
@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'authorization' })
export class AuthorizationStore extends Store<AuthorizationState> {
  constructor() {
    const tokenValue: string | null = localStorage.getItem('token-jwt');

    super({
      token: tokenValue ?? undefined
    });
  }
}
