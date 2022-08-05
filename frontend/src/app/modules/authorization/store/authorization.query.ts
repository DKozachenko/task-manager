import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { AuthorizationStore } from '.';
import { AuthorizationState } from '../models/states';

export class AuthorizationQuery extends Query<AuthorizationState> {
  /** Есть ли токен */
  public hasToken$: Observable<boolean> = this.select((state: AuthorizationState) => !!state.token);

  constructor(protected override store: AuthorizationStore) {
    super(store);
  }
}
