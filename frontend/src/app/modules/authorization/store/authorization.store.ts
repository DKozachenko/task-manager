import { AuthorizationState } from './../models/states/authorization.state';
import { EntityStore, StoreConfig } from '@datorama/akita';

@StoreConfig({ name: 'authorization', idKey: '_id' })
export class AuthorizationStore extends EntityStore<AuthorizationState> {
  constructor() {
    super();
  }
}
