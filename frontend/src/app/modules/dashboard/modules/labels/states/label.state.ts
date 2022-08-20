/* eslint-disable @typescript-eslint/no-empty-interface */
import { EntityState } from '@datorama/akita';
import { ILabelDto } from 'src/app/modules/shared/models/interfaces';

/**
 * Модель состояния меток
 */
export interface LabelState extends EntityState<ILabelDto, string> {}
