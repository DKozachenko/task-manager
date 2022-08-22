const Labels = require('../../models/label');
const Colors = require('../../models/color');
const Tasks = require('../../models/task');
const logger = require('../../utils/logger');
const generateResponseWithError = require('../../utils/generate-response-with-error');
const generateResponseWithData = require('../../utils/generate-response-with-data');

/**
 * Функция получения всех меток
 * @param {запрос} req - запрос 
 * @param {ответ} res - ответ 
 */
const getAll = async (req, res) => {
  /** Выборка всех меток определенного пользователя */
  const allLabels = await Labels.find({ 
    userId: req.user._id 
  });

  res.status(200).json(generateResponseWithData(allLabels));
};

/**
 * Функция получения метки по id
 * @param {запрос} req - запрос 
 * @param {ответ} res - ответ 
 */
const getById = async (req, res) => {
  const labelId = req.params.id;
  const requiredLabel = await Labels.findById(labelId);

  /** Если метка существует - посылаем ее, если нет - посылаем сообщение */
  if (requiredLabel) {
    /** Проверка на принадлежность получаемой метки текущему пользователю */
    if (requiredLabel.userId.toString() !== req.user._id.toString()) {
      res.status(403).json(generateResponseWithError(
        `Label with id ${labelId} does not belong to user ${req.user.nickname}`
      ));
      return;
    }

    res.status(200).json(generateResponseWithData(requiredLabel));
  } else {
    res.status(404).json(generateResponseWithError(
      `Label with id ${labelId} was not found`
    ));
  }
};

/**
 * Функция добавления метки
 * @param {запрос} req - запрос 
 * @param {ответ} res - ответ 
 */
const add = async (req, res) => {
  /** Если задачи, приходящие от клиента, существуют, создаем метку, если нет - посылаем сообщение клиенту */
  const existedTaskIds = [];

  for (const comeTaskId of req.body.taskIds) {
    const existedTask = await Tasks.findById(comeTaskId);

    if (existedTask) {
      /** Проверка на принадлежность присланных меток текущему пользователю */
      if (existedTask.userId.toString() !== req.user._id.toString()) {
        res.status(403).json(generateResponseWithError(
          `Task for task with id ${existedTask._id} does not belong to user ${req.user.nickname}`
        ));
        return;
      }

      existedTaskIds.push(comeTaskId);
    } else {
      res.status(404).json(generateResponseWithError(
        `Task with id ${comeTaskId} was not found`
      ));
      return;
    }
  }

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
    taskIds: req.body.taskIds,
    userId: req.user._id
  });

  await newLabel.save();

  /** Связь задач с меткой */
  for (const existedTaskId of existedTaskIds) {
    const existedTask = await Tasks.findById(existedTaskId);

    existedTask.labelIds.push(newLabel._id);
    await existedTask.save();
  }

  /** Связь цвета с меткой */
  comeColor.labelIds.push(newLabel._id);
  await comeColor.save();

  logger.info(`Label with name ${newLabel.name} was created`);
  res.status(200).json(generateResponseWithData(newLabel));
};

/**
 * Функция обновления метки по id
 * @param {запрос} req - запрос 
 * @param {ответ} res - ответ 
 */
const updateById = async (req, res) => {
  /** Если задачи, приходящие от клиента, существуют, создаем метку, если нет - посылаем сообщение клиенту */
  const existedComeTaskIds = [];

  for (const comeTaskId of req.body.taskIds) {
    const existedTask = await Tasks.findById(comeTaskId);

    if (existedTask) {
      /** Проверка на принадлежность присланных меток текущему пользователю */
      if (existedTask.userId.toString() !== req.user._id.toString()) {
        res.status(403).json(generateResponseWithError(
          `Task for task with id ${existedTask._id} does not belong to user ${req.user.nickname}`
        ));
        return;
      }

      existedComeTaskIds.push(comeTaskId);
    } else {
      res.status(404).json(generateResponseWithError(
        `Task with id ${comeTaskId} was not found`
      ));
      return;
    }
  }

  const labelId = req.params.id;
  const existedLabel = await Labels.findById(labelId);

  /** Если метка существует - меняем значения, если нет - посылаем клиенту сообщение */
  if (existedLabel) {
    const existedTaskIds = existedLabel.taskIds;

    /** Проверка на принадлежность получаемой метки текущему пользователю */
    if (existedLabel.userId.toString() !== req.user._id.toString()) {
      res.status(403).json(generateResponseWithError(
        `Label with id ${labelId} does not belong to user ${req.user.nickname}`
      ));
      return;
    }
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
    existedLabel.colorId = comeColor._id;
    existedLabel.taskIds = req.body.taskIds;
    await existedLabel.save();

    /** Связь задач с меткой */
    for (const existedComeTaskId of existedComeTaskIds) {
      if (!existedTaskIds.includes(existedComeTaskId)) {
        const existedTask = await Tasks.findById(existedComeTaskId);

        existedTask.labelIds.push(labelId);
        await existedTask.save();
      }      
    }

    for (const existedTaskId of existedTaskIds) {
      if (!existedComeTaskIds.includes(existedTaskId)) {
        const existedTask = await Tasks.findById(existedTaskId);

        existedTask.labelIds = existedTask.labelIds.filter(id => id.toString() !== labelId);
        await existedTask.save();
      }      
    }

    /** Связь цвета с меткой, если цвет еще не привязан */
    if (!comeColor.labelIds.includes(labelId)) {
      comeColor.labelIds.push(labelId);
      await comeColor.save();
    }

    logger.info(`Label with name ${existedLabel.name} was updated`);
    res.status(200).json(generateResponseWithData(existedLabel));
  } else {
    res.status(404).json(generateResponseWithError(
      `Label with id ${labelId} was not found`
    ));
  }
};

/**
 * Функция удаления метки по id
 * @param {запрос} req - запрос 
 * @param {ответ} res - ответ 
 */
const deleteById = async (req, res) => {
  const labelId = req.params.id;
  const existedLabel = await Labels.findById(labelId);

  /** Если метка существует - удаляем, если нет - посылаем клиенту сообщение */
  if (existedLabel) {
    /** Проверка на принадлежность получаемой метки текущему пользователю */
    if (existedLabel.userId.toString() !== req.user._id.toString()) {
      res.status(403).json(generateResponseWithError(
        `Label with id ${labelId} does not belong to user ${req.user.nickname}`
      ));
      return;
    }

    /** Удаление связи с задачами и цветом */
    const relatedTaskIds = existedLabel.taskIds;
    for (const relatedTaskId of relatedTaskIds) {
      const existedTask = await Tasks.findById(relatedTaskId);
      existedTask.labelIds = existedTask.labelIds.filter(id => id.toString() !== labelId);
      await existedTask.save(); 
    }

    const relatedColorId = existedLabel.colorId;
    const existedColor = await Colors.findById(relatedColorId);
    existedColor.labelIds = existedColor.labelIds.filter(id => id.toString() !== labelId);
    await existedColor.save();
  
    await Labels.findByIdAndRemove(labelId);

    logger.info(`Label with name ${existedLabel.name} was deleted`);
    res.status(200).json(generateResponseWithData({
      message: `Label with id ${labelId} was deleted`
    }));
  } else {
    res.status(404).json(generateResponseWithError(
      `Label with id ${labelId} was not found`
    ));
  }
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
};