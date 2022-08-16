/**
 * Модель метки
 */
export interface ILabel {
  _id?: string,
  name: string,
  colorId?: string,
  tasksIds?: string[],
  userId?: string
}
