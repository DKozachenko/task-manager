/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const supertest = require('supertest');

const app = require('../../app/app');
const CONFIG = require('../../config/index');
const Colors = require('../../models/color');
const Users = require('../../models/user');
const request = supertest(app);

/** Тестовый объект метки для тестов */
const testColor = {
  hexCode: 'green'
};

/** Id добавленного цвета */
let colorId = '';
/** Несуществующий id в БД */
const nonExistentId = '41224d776a326fb40f000001';

/** Тестовый объект пользователя для тестов */
const testUser = {
  fullName: 'test fullname',
  mail: 'test mail',
  nickname: 'test nick',
  password: 'test password'
};

/** Изначальное кол-во цветов до тестов */
let initialColorsLength = 0;
/** Id добавленного пользователя */
let testUserId = '';
/** Токен */
let testUserToken = '';

/** Перед всеми тестами добавление в БД цвета */
beforeAll(async () => {
  const response = await request.post(`/${CONFIG.prefix}/auth/register`)
    .send(testUser);
  testUserId = response.body.data._id;
  
  const response2 = await request.post(`/${CONFIG.prefix}/auth/login`)
    .send(testUser);
  
  testUserToken = response2.body.data.token;

  const allColors = await Colors.find();
  initialColorsLength = allColors.length;

  const testDbColor = new Colors({ 
    hexCode: testColor.hexCode 
  });

  await testDbColor.save();
  colorId = testDbColor._id.toString();
});

/** Тесты для получения всех записей */
describe('/getAll controller', () => {
  /** Тест получения всех цветов без токена */
  it('should return colors', async () => {
    const response = await request
      .get(`/${CONFIG.prefix}/colors`);
    
    expect(response.error.text).toBe('Unauthorized');
    expect(response.status).toBe(401);
  });

  /** Тест получения всех цветов */
  it('should return colors', async () => {
    const response = await request
      .get(`/${CONFIG.prefix}/colors`)
      .set('Authorization', testUserToken);
    
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(initialColorsLength + 1);
  });
});

/** Тесты для получения записи */
describe('/getById controller', () => {
  /** Тест получения цвета по существующему id */
  it('should return color by id if color exists', async () => {
    const response = await request
      .get(`/${CONFIG.prefix}/colors/${colorId}`)
      .set('Authorization', testUserToken);
    
    expect(response.status).toBe(200);
  });

  /** Тест получения цвета по несуществующему id */
  it('should return color by id if color does not exist', async () => {
    const response = await request
      .get(`/${CONFIG.prefix}/colors/${nonExistentId}`)
      .set('Authorization', testUserToken);
    
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Цвет с id ${nonExistentId} не найден`);
    expect(response.body.error).toBeTruthy();
  });
});

/** После всех тестов удаление добавленных цвета и пользователя */
afterAll(async () => {
  await Colors.findByIdAndRemove(colorId);
  await Users.findByIdAndRemove(testUserId);
});