/**
 * Модель метки
 */
export interface ILabel {
  _id?: string,
  name: string,
  colorId?: string,
  taskIds?: string[],
  userId?: string
}
