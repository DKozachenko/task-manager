import { AuthorizationState } from './../models/states/authorization.state';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'authorization' })
export class AuthorizationStore extends Store<AuthorizationState> {
  constructor() {
    super({
      token: undefined
    });
  }
}