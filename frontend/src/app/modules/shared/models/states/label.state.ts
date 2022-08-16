/* eslint-disable @typescript-eslint/no-empty-interface */
import { EntityState } from '@datorama/akita';
import { ILabel } from '../interfaces';

/**
 * Модель состояния меток
 */
export interface LabelState extends EntityState<ILabel, string> {}
