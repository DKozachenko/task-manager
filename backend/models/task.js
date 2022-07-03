/* eslint-disable array-bracket-newline */
const mongoose = require('mongoose');

/**
 * Модель сущности Задачи
 */
const taskSchema = new mongoose.Schema({
  /** Название */
  name: {
    type: String,
    required: true
  },
  /** Описание */
  description: {
    type: String,
    required: true
  },
  /** Id's меток */
  labelIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Label'
    }
  ],
  /** Id Пользователя */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Task', taskSchema);