/* eslint-disable no-console */
const Tasks = require('../models/task');
const Labels = require('../models/label');
const logger = require('../logger/logger');

const getAll = async (req, res) => {
  const allTasks = await Tasks.find();

  res.status(200).json(allTasks);
};

const getById = async (req, res) => {
  const taskId = req.params.id;
  const requiredTask = await Tasks.findById(taskId);

  if (requiredTask) {
    res.status(200).json(requiredTask);
  } else {
    res.status(404).json({
      message: `Task with id ${taskId} was not found`
    });
  }
};

const add = async (req, res) => {
  /** Если метки, приходящие от клиента, существуют, создаем задача, если нет - посылаем сообщение клиенту */
  const existedLabelIds = [];

  for (const comeLabelId of req.body.labelIds) {
    const existedLabel = await Labels.findById(comeLabelId);

    if (existedLabel) {
      existedLabelIds.push(comeLabelId);
    } else {
      res.status(404).json({
        message: `Label with id ${comeLabelId} was not found`
      });
    }
  }

  const newTask = new Tasks({
    name: req.body.name,
    description: req.body.description,
    labelIds: existedLabelIds
  });

  await newTask.save();

  /** Связь меток с задачей */
  for (const existedLabelId of existedLabelIds) {
    const existedLabel = await Labels.findById(existedLabelId);

    existedLabel.taskIds.push(newTask._id);
    await existedLabel.save();
  }

  logger.info(`Task with name ${newTask.name} was created`);
  res.status(200).json(newTask);
};

const updateById = async (req, res) => {
  /** Если метки, приходящие от клиента, существуют, создаем задача, если нет - посылаем сообщение клиенту */
  const existedLabelIds = [];

  for (const comeLabelId of req.body.labelIds) {
    const existedLabel = await Labels.findById(comeLabelId);

    if (existedLabel) {
      existedLabelIds.push(comeLabelId);
    } else {
      res.status(404).json({
        message: `Label with id ${comeLabelId} was not found`
      });
    }
  }

  const taskId = req.body.id;
  const existedTask = await Tasks.findById(taskId);

  /** Если задача существует - меняем значения, если нет - посылаем клиенту сообщение */
  if (existedTask) {
    existedTask.name = req.body.name;
    existedTask.description = req.body.description;
    existedTask.labelIds = existedLabelIds;

    await existedTask.save();
    
    /** Связь меток с задачей */
    for (const existedLabelId of existedLabelIds) {
      const existedLabel = await Labels.findById(existedLabelId);

      if (!existedLabel.taskIds.includes(taskId)) {
        existedLabel.taskIds.push(taskId);
        await existedLabel.save();
      }
    }

    logger.info(`Task with name ${existedTask.name} was updated`);
    res.status(200).json(existedTask);
  } else {
    res.status(404).json({
      message: `Task with id ${taskId} was not found`
    });
  }
};

const deleteById = async (req, res) => {
  const taskId = req.params.id;
  const existedTask = await Tasks.findById(taskId);

  /** Удаление связи с метками */
  const relatedLabelIds = existedTask.labelIds;
  for (const relatedLabelId of relatedLabelIds) {
    const existedLabel = await Labels.findById(relatedLabelId);
    existedLabel.taskIds = existedLabel.taskIds.filter(id => id.toString() !== taskId);
    await existedLabel.save(); 
  }

  /** Если задача существует - удаляем, если нет - посылаем клиенту сообщение */
  if (existedTask) {
    await Tasks.findByIdAndRemove(taskId);

    logger.info(`Task with name ${existedTask.name} was deleted`);
    res.status(200).json({
      message: `Task with id ${taskId} was deleted`
    });
  } else {
    res.status(404).json({
      message: `Task with id ${taskId} was not found`
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