/**
 * Модель метки
 */
export interface ILabelDto {
  _id?: string,
  name: string,
  colorId?: string,
  taskIds?: string[],
  userId?: string
}
