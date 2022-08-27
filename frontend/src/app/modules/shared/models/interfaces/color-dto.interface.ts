/**
 * Модель цвета в БД
 */
export interface IColorDto {
  /** Id записи */
  _id?: string,
  /** Hex-код цвета */
  hexCode: string,
  /** Массив с id меток */
  labelsIds?: string[]
}
