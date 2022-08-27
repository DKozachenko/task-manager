/**
 * Модель задачи в БД
 */
export interface ITaskDto {
  /** Id записи */
  _id?: string;
  /** Название */
  name: string;
  /** Описание */
  description: string;
  /** Дата создания */
  dateCreation?: Date;
  /** Массив с id меток */
  labelIds?: string[];
  /** Id пользователя */
  userId?: string;
}
