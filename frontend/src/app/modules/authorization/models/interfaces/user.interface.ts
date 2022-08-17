/**
 * Модель сущности Пользователя
 */
export interface IUser {
  /** Id записи */
  _id?: string;
  /** Полное имя */
  fullName?: string;
  /** Почта */
  mail?: string;
  /** Дата регистрации */
  dateRegistration?: Date;
  /** Никнейм */
  nickname: string;
  /** Пароль */
  password: string;
  /** Id's меток */
  labelIds?: string[];
  /** Id's задач */
  taskIds?: string[];
}
