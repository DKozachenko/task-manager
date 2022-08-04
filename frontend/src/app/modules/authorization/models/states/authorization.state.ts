import { EntityState } from '@datorama/akita';
import { IUser } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthorizationState extends EntityState<IUser, string> { }
