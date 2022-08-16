const Colors = require('../../models/color');
const generateResponseWithError = require('../../utils/generate-response-with-error');
const generateResponseWithData = require('../../utils/generate-response-with-data');

/**
 * Функция получения цвета по id
 * @param {запрос} req - запрос 
 * @param {ответ} res - ответ 
 */
const getById = async (req, res) => {
  const colorId = req.params.id;
  const requiredColor = await Colors.findById(colorId);

  /** Если цвет существует - посылаем его, если нет - посылаем сообщение */
  if (requiredColor) {
    res.status(200).json(generateResponseWithData(requiredColor));
  } else {
    res.status(404).json(generateResponseWithError(
      `Color with id ${colorId} was not found`
    ));
  }
};

module.exports = {
  getById
};