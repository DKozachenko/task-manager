/**
 * Модель цвета в БД
 */
export interface IColorDto {
  /** Id записи */
  _id?: string,
  /** hexCode цвета */
  hexCode: string,
  /** Массив с id меток */
  labelsIds?: string[]
}
