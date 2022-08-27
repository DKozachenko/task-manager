/**
 * Модель метки в БД
 */
export interface ILabelDto {
  /** Id записи */
  _id?: string;
  /** Название */
  name: string;
  /** Id цвета */
  colorId?: string;
  /** Массив с id задач */
  taskIds?: string[];
  /** Id пользователя */
  userId?: string;
}
