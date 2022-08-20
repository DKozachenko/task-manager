/**
 * Модель задачи
 */
export interface ITaskDto {
  _id?: string,
  name: string,
  description: string,
  dateCreation?: Date,
  labelIds?: string[],
  userId?: string
}
