const mongoose = require('mongoose');

/**
 * Модель сущности Пользователя
 */
const userSchema = new mongoose.Schema({
  /** Полное имя */
  fullName: {
    type: String,
  },
  /** Почта */
  mail: {
    type: String,
  },
  /** Дата регистрации */
  dateRegistration: {
    type: Date,
    default: Date.now
  },
  /** Никнейм */
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  /** Пароль */
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);