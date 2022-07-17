/* eslint-disable no-console */
const Labels = require('../models/label');
const Colors = require('../models/color');
const logger = require('../logger/logger');

const getAll = async (req, res) => {
  const allLabels = await Labels.find();

  res.status(200).json(allLabels);
};

const getById = async (req, res) => {
  const labelId = req.params.id;
  const requiredLabel = await Labels.findById(labelId);

  if (requiredLabel) {
    res.status(200).json(requiredLabel);
  } else {
    res.status(404).json({
      message: `Label with id ${labelId} was not found`
    });
  }
};

const add = async (req, res) => {
  /** Определение, существует ли цвет метки */
  let comeColor = req.body.color;
  const existedColor = await Colors.findOne({
    hexCode: comeColor.hexCode
  });

  /** Если не существует, то создаем */
  if (existedColor) {
    comeColor = existedColor;
  } else {
    const newColor = new Colors({
      hexCode: comeColor.hexCode
    });
    
    comeColor = await newColor.save();
  }

  /** Создание метки */
  const newLabel = new Labels({
    name: req.body.name,
    colorId: comeColor._id,
    taskIds: req.body.taskIds
  });

  await newLabel.save();

  /** Связь цвета с меткой */
  comeColor.labelIds.push(newLabel._id);
  await comeColor.save();

  logger.info(`Label with name ${newLabel.name} was created`);
  res.status(200).json(newLabel);
};

const updateById = async (req, res) => {
  const labelId = req.params.id;
  const existedLabel = await Labels.findById(labelId);

  /** Если метка существует - меняем значения, если нет - посылаем клиенту сообщение */
  if (existedLabel) {
    /** Определение, существует ли цвет метки */
    let comeColor = req.body.color;
    const existedColor = await Colors.findOne({
      hexCode: comeColor.hexCode
    });

    /** Если не существует, то создаем */
    if (existedColor) {
      comeColor = existedColor;
    } else {
      const newColor = new Colors({
        hexCode: comeColor.hexCode
      });
      
      comeColor = await newColor.save();
    }

    /** Редактирование метки */
    existedLabel.name = req.body.name;
    existedColor.colorId = comeColor._id;
    existedLabel.taskIds = req.body.taskIds;
    await existedLabel.save();

    /** Связь цвета с меткой, если цвет еще не привязан */
    if (!comeColor.labelIds.includes(labelId)) {
      comeColor.labelIds.push(labelId);
      await comeColor.save();
    }

    logger.info(`Label with name ${existedLabel.name} was updated`);
    res.status(200).json(existedLabel);
  } else {
    res.status(404).json({
      message: `Label with id ${labelId} was not found`
    });
  }
};

const deleteById = async (req, res) => {
  const labelId = req.params.id;
  const existedLabel = await Labels.findById(labelId);

  /** Если метка существует - удаляем, если нет - посылаем клиенту сообщение */
  if (existedLabel) {
    await Labels.findByIdAndRemove(labelId);
    res.status(200).json({
      message: `Label with id ${labelId} was deleted`
    });
  } else {
    res.status(404).json({
      message: `Label with id ${labelId} was not found`
    });
  }
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
};