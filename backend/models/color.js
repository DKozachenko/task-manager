/* eslint-disable array-bracket-newline */
const mongoose = require('mongoose');

/**
 * Модель сущности Цвета
 */
const colorSchema = new mongoose.Schema({
  /** Hex Code */
  hexCode: {
    type: String,
    required: true
  },
  /** Id's меток */
  labelIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Label'
    }
  ]
});

module.exports = mongoose.model('Color', colorSchema);