/**
 * Модель задачи
 */
export interface ITask {
  /** Id */
  _id?: string,
  /** Название */
  name: string,
  /** Описание */
  description: string,
  /** Дата создания */
  dateCreation?: Date,
  /** Id's меток */
  labelIds?: string[]
  /** Id пользователя */
  userId?: string
}
