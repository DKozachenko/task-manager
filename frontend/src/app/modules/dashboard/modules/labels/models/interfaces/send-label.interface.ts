import { ILabelDto } from 'src/app/modules/shared/models/interfaces';

/**
 * Модель посылаемой на сервер метки и получаемой для редактирования
 */
export interface ISendLabel extends Omit<ILabelDto, 'colorId'> {
  color: {
    hexCode: string
  }
}
