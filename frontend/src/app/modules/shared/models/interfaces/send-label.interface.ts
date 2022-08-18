import { ILabel } from '.';

/**
 * Модель посылаемой на сервер метки
 */
export interface ISendLabel extends Omit<ILabel, 'colorId'> {
  color: {
    hexCode: string
  }
}
