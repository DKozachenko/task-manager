const Tasks = require('../models/task');
const Labels = require('../models/label');
const logger = require('../logger/logger');

/**
 * Функция получения всех задач
 * @param {запрос} req - запрос 
 * @param {ответ} res - ответ 
 */
const getAll = async (req, res) => {
  /** Выборка всех задач определенного пользователя */
  const allTasks = await Tasks.find({ 
    userId: req.user._id 
  });

  res.status(200).json(allTasks);
};

/**
 * Функция получения задачи по id
 * @param {запрос} req - запрос 
 * @param {ответ} res - ответ 
 */
const getById = async (req, res) => {
  const taskId = req.params.id;
  const requiredTask = await Tasks.findById(taskId);

  /** Если задача существует - посылаем ее, если нет - посылаем сообщение */
  if (requiredTask) {
    /** Проверка на принадлежность получаемой задачи текущему пользователю */
    if (requiredTask.userId !== req.user._id) {
      res.status(403).json({
        message: `Task with id ${taskId} does not belong to user ${req.user.nickname}`
      });
      return;
    }

    res.status(200).json(requiredTask);
  } else {
    res.status(404).json({
      message: `Task with id ${taskId} was not found`
    });
  }
};

/**
 * Функция добавления задачи
 * @param {запрос} req - запрос 
 * @param {ответ} res - ответ 
 */
const add = async (req, res) => {
  /** Если метки, приходящие от клиента, существуют, создаем задачу, если нет - посылаем сообщение клиенту */
  const existedLabelIds = [];

  for (const comeLabelId of req.body.labelIds) {
    const existedLabel = await Labels.findById(comeLabelId);

    if (existedLabel) {
      /** Проверка на принадлежность присланных меток текущему пользователю */
      if (existedLabel.userId !== req.user._id) {
        res.status(403).json({
          message: `Label for task with id ${existedLabel._id} does not belong to user ${req.user.nickname}`
        });
        return;
      }

      existedLabelIds.push(comeLabelId);
    } else {
      res.status(404).json({
        message: `Label with id ${comeLabelId} was not found`
      });
      return;
    }
  }

  const newTask = new Tasks({
    name: req.body.name,
    description: req.body.description,
    labelIds: existedLabelIds,
    userId: req.user._id
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

/**
 * Функция обновления задачи по id
 * @param {запрос} req - запрос 
 * @param {ответ} res - ответ 
 */
const updateById = async (req, res) => {
  /** Если метки, приходящие от клиента, существуют, создаем задачу, если нет - посылаем сообщение клиенту */
  const existedLabelIds = [];

  for (const comeLabelId of req.body.labelIds) {
    const existedLabel = await Labels.findById(comeLabelId);

    if (existedLabel) {
      /** Проверка на принадлежность присланных меток текущему пользователю */
      if (existedLabel.userId !== req.user._id) {
        res.status(403).json({
          message: `Label for task with id ${existedLabel._id} does not belong to user ${req.user.nickname}`
        });
        return;
      }

      existedLabelIds.push(comeLabelId);
    } else {
      res.status(404).json({
        message: `Label with id ${comeLabelId} was not found`
      });
      return;
    }
  }

  const taskId = req.params.id;
  const existedTask = await Tasks.findById(taskId);

  /** Если задача существует - меняем значения, если нет - посылаем клиенту сообщение */
  if (existedTask) {
    /** Проверка на принадлежность получаемой задачи текущему пользователю */
    if (existedTask.userId !== req.user._id) {
      res.status(403).json({
        message: `Task with id ${taskId} does not belong to user ${req.user.nickname}`
      });
      return;
    }

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

/**
 * Функция удаления задачи по id
 * @param {запрос} req - запрос 
 * @param {ответ} res - ответ 
 */
const deleteById = async (req, res) => {
  const taskId = req.params.id;
  const existedTask = await Tasks.findById(taskId);

  /** Если задача существует - удаляем, если нет - посылаем клиенту сообщение */
  if (existedTask) {
    /** Проверка на принадлежность получаемой задачи текущему пользователю */
    if (existedTask.userId !== req.user._id) {
      res.status(403).json({
        message: `Task with id ${taskId} does not belong to user ${req.user.nickname}`
      });
      return;
    }

    /** Удаление связи с метками */
    const relatedLabelIds = existedTask.labelIds;
    for (const relatedLabelId of relatedLabelIds) {
      const existedLabel = await Labels.findById(relatedLabelId);
      existedLabel.taskIds = existedLabel.taskIds.filter(id => id.toString() !== taskId);
      await existedLabel.save(); 
    }
    
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