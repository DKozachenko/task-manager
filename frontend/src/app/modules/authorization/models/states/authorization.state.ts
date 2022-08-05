import { EntityState } from '@datorama/akita';
import { IUser } from '../interfaces';

export interface AuthorizationState extends EntityState<IUser, string> {
  token: string | undefined;
}
