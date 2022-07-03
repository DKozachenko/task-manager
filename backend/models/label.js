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
  /** Id Пользователя */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Label', labelSchema);