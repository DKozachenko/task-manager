/**
 * Модель ответа от сервера
 */
export interface IResponse<T = undefined> {
  /** Данные */
  data: T,
  /** Есть ли ошибка */
  error: boolean,
  /** Сообщение */
  message: string | undefined
}
