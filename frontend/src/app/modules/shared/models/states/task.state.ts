/* eslint-disable @typescript-eslint/no-empty-interface */
import { EntityState } from '@datorama/akita';
import { ITask } from '../interfaces';

/**
 * Модель состояния меток
 */
export interface TaskState extends EntityState<ITask, string> {}
