/**
 * Модель метки
 */
export interface ILabel {
  /** Id */
  _id?: string,
  /** Название */
  name: string,
  /** Id цвета */
  colorId?: string,
  /** Id пользователя */
  userId?: string,
  /** Id's задач */
  taskIds?: string[]
}
