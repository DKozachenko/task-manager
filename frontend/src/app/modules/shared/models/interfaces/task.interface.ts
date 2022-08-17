/**
 * Модель задачи
 */
export interface ITask {
  _id?: string,
  name: string,
  description: string,
  dateCreation?: Date,
  labelsIds?: string[],
  userId?: string
}
