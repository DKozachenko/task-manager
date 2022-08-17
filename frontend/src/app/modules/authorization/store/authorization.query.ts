import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
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
  public get hasToken() {
    return !!this.getValue().token;
  }
}
