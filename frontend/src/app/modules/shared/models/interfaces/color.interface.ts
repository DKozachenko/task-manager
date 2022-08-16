/**
 * Модель цвета
 */
export interface IColor {
  /** Id */
  _id?: string,
  /** Название */
  hexCode: string,
  /** Id's задач */
  labelIds?: string[]
}
