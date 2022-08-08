/**
 * Модель ответа от сервера
 */
export interface IResponse<T = undefined> {
  data: T,
  error: boolean,
  message: string | undefined
}
