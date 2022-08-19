/**
 * Модель задачи
 */
export interface ITask {
  _id?: string,
  name: string,
  description: string,
  dateCreation?: Date,
  labelIds?: string[],
  userId?: string
}
