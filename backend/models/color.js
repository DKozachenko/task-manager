const mongoose = require('mongoose');

/**
 * Модель сущности Цвета
 */
const colorSchema = new mongoose.Schema({
  /** Hex Code */
  hexCode: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Color', colorSchema);