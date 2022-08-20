/**
 * Модель цвета в БД
 */
export interface IColorDto {
  _id?: string,
  hexCode: string,
  labelsIds?: string[]
}
