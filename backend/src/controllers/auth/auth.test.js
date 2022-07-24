/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const supertest = require('supertest');
const bcrypt = require('bcryptjs');

const app = require('../../app/app');
const CONFIG = require('../../config/index');
const Users = require('../../models/user');
const request = supertest(app);

const testUser = {
  fullName: 'test fullname',
  mail: 'test mail',
  nickname: 'test nick',
  password: 'test password'
};

/** Тесты для регистрации */
describe('/register controller', () => {
  let testUserId = '';
  
  /** Тест регистрация нового пользователя с проверкой ответа и хэшированного пароля */
  it('should register new user', async () => {
    const response = await request
      .post(`/${CONFIG.prefix}/auth/register`)
      .send(testUser);
    
    testUserId = response.body._id;
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(await bcrypt.compare(testUser.password, response.body.password)).toBeTruthy();
  });

  /** Тест ошибки при существовании пользователя с такой же почтой */
  it('should send message if mail is already in use', async () => {
    const response = await request
      .post(`/${CONFIG.prefix}/auth/register`)
      .send({
        ...testUser,
        nickname: 'test nickname123'
      });
    
    expect(response.status).toBe(403);
    expect(response.body.message).toBe(`User with mail ${testUser.mail} is already exists`);
  });

  /** Тест ошибки при существовании пользователя с таким же ником */
  it('should send message if nickname is already in use', async () => {
    const response = await request
      .post(`/${CONFIG.prefix}/auth/register`)
      .send({
        ...testUser,
        mail: 'test mail123'
      });
    
    expect(response.status).toBe(403);
    expect(response.body.message).toBe(`User with nickname ${testUser.nickname} is already exists`);
  });

  /** После всех тестов удаление тестового пользователя */
  afterAll(async () => {
    const response = await Users.findOneAndRemove(testUserId);
  });
});

/** Тесты для логина */
describe('/login controller', () => {
  let testUserId = '';

  /** Перед всеми тестами регистрация нового пользователя */
  beforeAll(async () => {
    const response = await request
      .post(`/${CONFIG.prefix}/auth/register`)
      .send(testUser);
    
    testUserId = response.body._id;
  });

  /** Тест возвращения токена при успешном входе */
  it('should return token if user logged in', async () => {
    const response = await request
      .post(`/${CONFIG.prefix}/auth/login`)
      .send({
        nickname: testUser.nickname,
        password: testUser.password
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  /** Тест ошибки, если пользователь с указанными ником не существует */
  it('should send message if user does not exist', async () => {
    const response = await request
      .post(`/${CONFIG.prefix}/auth/login`)
      .send({
        nickname: testUser.nickname + 'fdgdfgdfg',
        password: testUser.password
      });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`User with nickname ${testUser.nickname + 'fdgdfgdfg'} was not found`);
  });

  /** Тест ошибки, если пароль для пользователя неверный */
  it('should send message if password is not correct', async () => {
    const response = await request
      .post(`/${CONFIG.prefix}/auth/login`)
      .send({
        nickname: testUser.nickname,
        password: testUser.password + 'fdsfd'
      });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe(`Passord for user with nickname ${testUser.nickname} is not correct`);
  });

  /** После всех тестов удаление тестового пользователя */
  afterAll(async () => {
    const response = await Users.findOneAndRemove(testUserId);
  });
});
