const bcrypt = require('bcryptjs');

const Users = require('../models/user');
const logger = require('../logger/logger');

/**
 * Функция входа
 * @param {запрос} req - запрос 
 * @param {ответ} res - ответ 
 */
const login = async (req, res) => {
  /** Поиск существуеющего пользователя */
  const requiredUser = Users.findOne({
    nickname: req.body.nickname
  });

  /** Если пользователь найден, сравниваем пароли, если нет - отправляем клиенту сообщение */
  if (requiredUser) {
    const clientPassword = req.body.password;

    const matchPasswords = await bcrypt.compare(clientPassword, requiredUser.password);

    /** Если пароли совпали отправляем токен, если нет - отправляем клиенту сообщение */
    if(matchPasswords) {
      logger.info(`User: ${requiredUser.nickname} logged in with token ${''}`);
      res.status(200).json({
        token: ''
      });
    } else {
      res.status(401).json({
        message: `Passord for user with nickname ${req.body.nickname} is not correct`
      });
    }

  } else {
    res.status(404).json({
      message: `User with nickname ${req.body.nickname} was not found`
    });
  }
};

/**
 * Функция регистрации
 * @param {запрос} req - запрос 
 * @param {ответ} res - ответ 
 */
const register = async (req, res) => {
  /** Поиск существующих пользователей с такой почтой или никнеймом
   * Если нашлись, отправляем клиенту сообщение, если нет - хэшируем пароль
   * и создаем пользователя
   */

  const existedMailUser = Users.findOne({
    mail: req.body.mail
  });

  if (existedMailUser) {
    res.status(403).json({
      message: `User with mail ${req.body.mail} is already exists`
    });
  }

  const existedNicknameUser = Users.findOne({
    nickname: req.body.nickname
  });

  if (existedNicknameUser) {
    res.status(403).json({
      message: `User with nickname ${req.body.nickname} is already exists`
    });
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = new Users({
    fullName: req.body.fullName,
    mail: req.body.mail,
    dateRegistration: req.body.dateRegistration,
    nickname: req.body.nickname,
    password: hashPassword,
    labelIds: [],
    taskIds: []
  });

  /** Сохраняем пользователя, если удалось, отправляем его клиенту, если нет - отправляем сообщение */
  try {
    await newUser.save();
    logger.info(`User with nickname ${req.body.nickname} was registered`);
    res.status(201).json(newUser);
  } catch (error) {
    logger.error(`While registering user with nickname ${req.body.nickname} error ${error} occurred`);
    res.status(500).json({
      message: `Ошибка при регистрации нового пользователя: ${error.message ? error.message: error}`
    });
  }
};

module.exports = {
  login,
  register
};