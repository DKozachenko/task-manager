/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const supertest = require('supertest');

const app = require('../app/app');
const CONFIG = require('../config/index');
const Labels = require('../models/label');
const Colors = require('../models/color');
const request = supertest(app);

/** Тестовый объект метки для тестов */
const testLabel = {
  name: 'test label',
  color: {
    hexCode: 'test hexCode'
  }
};

/** Изначальное кол-во меток до тестов */
let initialLabelsLength = 0;
/** Все id меток, что будут добавлены во время тестов */
const labelIds = [];
/** Id добавленного цвета */
let colorId = '';
/** Несуществующий id в БД */
const nonExistentId = '41224d776a326fb40f000001';

/** Перед всеми тестами запоминание кол-ва меток, добавление в БД двух тестовых меток и цвета */
beforeAll(async () => {
  const allLabels = await Labels.find();
  initialLabelsLength = allLabels.length;

  const testDbColor = new Colors({ 
    hexCode: testLabel.color.hexCode 
  });
  await testDbColor.save();
  colorId = testDbColor._id.toString();
  
  const testDbLabel = new Labels({ 
    name: testLabel.name,
    colorId: colorId 
  });
  await testDbLabel.save();
  labelIds.push(testDbLabel._id);

  const testDbLabel2 = new Labels({ 
    name: testLabel.name 
  });
  await testDbLabel2.save();
  labelIds.push(testDbLabel2._id);
});

/** Тесты для получения всех записей */
describe('/getAll controller', () => {
  /** Тест получения всех меток */
  it('should return labels', async () => {
    const response = await request
      .get(`/${CONFIG.prefix}/labels`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(initialLabelsLength + 2);
  });
});

/** Тесты для получения записи */
describe('/getById controller', () => {
  /** Тест получения метки по существующему id */
  it('should return label by id if label exists', async () => {
    const response = await request
      .get(`/${CONFIG.prefix}/labels/${labelIds[0]}`);
    
    expect(response.status).toBe(200);
  });

  /** Тест получения метки по несуществующему id */
  it('should return label by id if label does not exist', async () => {
    const response = await request
      .get(`/${CONFIG.prefix}/labels/${nonExistentId}`);
    
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Label with id ${nonExistentId} was not found`);
  });
});

/** Тесты для добавления записи */
describe('/add controller', () => {
  /** Тест добавления метки */
  it('should return added label if is was added', async () => {
    const response = await request
      .post(`/${CONFIG.prefix}/labels`).
      send(testLabel);

    labelIds.push(response.body._id);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.colorId).toBe(colorId);
  });
});

/** Тесты для обновления записи */
describe('/updateById controller', () => {
/** Тест обновления метки с существующим id */
  it('should return updated label if label exists', async () => {
    const response = await request
      .put(`/${CONFIG.prefix}/labels/${labelIds[0]}`).
      send({
        name: testLabel.name + 'updated',
        color: testLabel.color
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(testLabel.name + 'updated');
    expect(response.body.colorId).toBe(colorId);
  });
  
  /** Тест обновления метки с несуществующим id */
  it('should return message if label does not exist', async () => {
    const response = await request
      .put(`/${CONFIG.prefix}/labels/${nonExistentId}`).
      send({
        name: testLabel.name + 'updated',
        color: testLabel.color
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Label with id ${nonExistentId} was not found`);
  });
});

/** Тесты для удаления записей */
describe('/deleteById controller', () => {
  /** Тест удаления метки с существующим id */
  it('should return success message if label exists', async () => {
    const allLabels = await Labels.find();
    const currentLabelsLength = allLabels.length;

    const response = await request
      .delete(`/${CONFIG.prefix}/labels/${labelIds[0]}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Label with id ${labelIds[0]} was deleted`);
    
    const allLabelsAfterDelete = await Labels.find();
    const labelsLengthAfterDelete = allLabelsAfterDelete.length;

    expect(labelsLengthAfterDelete).toBe(currentLabelsLength - 1);
  });
  
  /** Тест удаления метки с несуществующим id */
  it('should return failed message if label does not exist', async () => {
    const response = await request
      .delete(`/${CONFIG.prefix}/labels/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Label with id ${nonExistentId} was not found`);
  });
});

/** После всех тестов удаление добавленных меток и цвета */
afterAll(async () => {
  for (const labelId of labelIds) {
    await Labels.findByIdAndRemove(labelId);
  }

  await Colors.findByIdAndRemove(colorId);
});