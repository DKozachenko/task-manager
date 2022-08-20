/* eslint-disable @typescript-eslint/no-empty-interface */
import { EntityState } from '@datorama/akita';
import { ITaskDto } from 'src/app/modules/shared/models/interfaces';

/**
 * Модель состояния меток
 */
export interface TaskState extends EntityState<ITaskDto, string> {}
