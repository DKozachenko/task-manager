/* eslint-disable array-bracket-newline */
const mongoose = require('mongoose');

/**
 * Модель сущности Метки
 */
const labelSchema = new mongoose.Schema({
  /** Название */
  name: {
    type: String,
    required: true
  },
  /** Id цвета */
  colorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Color'
  },
  /** Id пользователя */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  /** Id's задач */
  taskIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }
  ],
});

module.exports = mongoose.model('Label', labelSchema);