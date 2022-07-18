/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const supertest = require('supertest');

const app = require('../app/app');
const CONFIG = require('../config/index');
const Labels = require('../models/label');
const Tasks = require('../models/task');
const request = supertest(app);

/** Тестовый объект задачи для тестов */
const testTask = {
  name: 'test task',
  description: 'test description'
};

/** Тестовый объект метки для тестов */
const testLabel = {
  name: 'test label',
  color: {
    hexCode: 'test hexCode'
  }
};

/** Изначальное кол-во задач до тестов */
let initialTasksLength = 0;
/** Все id задач, что будут добавлены во время тестов */
const taskIds = [];
/** Все id меток, что будут добавлены во время тестов */
const labelIds = [];
/** Id добавленного цвета */
let colorId = '';
/** Несуществующий id в БД */
const nonExistentId = '41224d776a326fb40f000001';

/** Перед всеми тестами запоминание кол-ва меток, добавление в БД двух тестовых меток и цвета */
beforeAll(async () => {
  const allTasks = await Tasks.find();
  initialTasksLength = allTasks.length;

  /** Сохранение тестовый цвет */
  const testDbColor = new Colors({ 
    hexCode: testLabel.color.hexCode 
  });
  await testDbColor.save();
  colorId = testDbColor._id.toString();
  
  /** Сохранение тестовую метку, организация связи */
  const testDbLabel = new Labels({ 
    name: testLabel.name,
    colorId: colorId 
  });
  await testDbLabel.save();
  labelIds.push(testDbLabel._id.toString());

  testDbColor.labelIds.push(testDbLabel);
  await testDbColor.save();

  /** Сохранение двух задач, одна с меткой, другая - без */
  const testDbTask = new Tasks({ 
    name: testTask.name,
    description: testTask.description,
    labelIds: [testDbLabel._id]
  });
  await testDbTask.save();
  taskIds.push(testDbTask._id.toString());

  testDbLabel.taskIds.push(testDbTask);
  await testDbLabel.save();

  const testDbTask2 = new Tasks({ 
    name: testTask.name,
    description: testTask.description
  });
  await testDbTask2.save();
  taskIds.push(testDbTask2._id.toString());
});

/** Тесты для получения всех записей */
describe('/getAll controller', () => {
  /** Тест получения всех меток */
  it('should return task', async () => {
    const response = await request
      .get(`/${CONFIG.prefix}/tasks`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(initialTasksLength + 2);
  });
});

/** Тесты для получения записи */
describe('/getById controller', () => {
  /** Тест получения метки по существующему id */
  it('should return task by id if task exists', async () => {
    const response = await request
      .get(`/${CONFIG.prefix}/tasks/${taskIds[0]}`);
    
    expect(response.status).toBe(200);
  });

  /** Тест получения метки по несуществующему id */
  it('should return task by id if task does not exist', async () => {
    const response = await request
      .get(`/${CONFIG.prefix}/tasks/${nonExistentId}`);
    
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Label with id ${nonExistentId} was not found`);
  });
});

/** Тесты для добавления записи */
describe('/add controller', () => {
  /** Тест добавления метки */
  // it('should return added label if is was added', async () => {
  //   const response = await request
  //     .post(`/${CONFIG.prefix}/labels`).
  //     send(testLabel);

  //   labelIds.push(response.body._id);

  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty('_id');
  //   expect(response.body.colorId).toBe(colorId);
  // });
});

/** Тесты для обновления записи */
describe('/updateById controller', () => {
/** Тест обновления метки с существующим id */
  // it('should return updated label if label exists', async () => {
  //   const response = await request
  //     .put(`/${CONFIG.prefix}/labels/${labelIds[0]}`).
  //     send({
  //       name: testLabel.name + 'updated',
  //       color: testLabel.color
  //     });

  //   expect(response.status).toBe(200);
  //   expect(response.body.name).toBe(testLabel.name + 'updated');
  //   expect(response.body.colorId).toBe(colorId);
  //});
  
  /** Тест обновления метки с несуществующим id */
  // it('should return message if label does not exist', async () => {
  //   const response = await request
  //     .put(`/${CONFIG.prefix}/labels/${nonExistentId}`).
  //     send({
  //       name: testLabel.name + 'updated',
  //       color: testLabel.color
  //     });

  //   expect(response.status).toBe(404);
  //   expect(response.body.message).toBe(`Label with id ${nonExistentId} was not found`);
  // });
});

/** Тесты для удаления записей */
describe('/deleteById controller', () => {
  /** Тест удаления метки с существующим id */
  // it('should return success message if label exists', async () => {
  //   const allLabels = await Labels.find();
  //   const currentLabelsLength = allLabels.length;

  //   const response = await request
  //     .delete(`/${CONFIG.prefix}/labels/${labelIds[0]}`);

  //   expect(response.status).toBe(200);
  //   expect(response.body.message).toBe(`Label with id ${labelIds[0]} was deleted`);
    
  //   const allLabelsAfterDelete = await Labels.find();
  //   const labelsLengthAfterDelete = allLabelsAfterDelete.length;

  //   expect(labelsLengthAfterDelete).toBe(currentLabelsLength - 1);
  // });
  
  /** Тест удаления метки с несуществующим id */
  // it('should return failed message if label does not exist', async () => {
  //   const response = await request
  //     .delete(`/${CONFIG.prefix}/labels/${nonExistentId}`);

  //   expect(response.status).toBe(404);
  //   expect(response.body.message).toBe(`Label with id ${nonExistentId} was not found`);
  // });
});

/** После всех тестов удаление добавленных задач и меток */
afterAll(async () => {
  for (const taskId of taskIds) {
    await Tasks.findByIdAndRemove(taskId);
  }

  for (const labelId of labelIds) {
    await Labels.findByIdAndRemove(labelId);
  }

  await Colors.findByIdAndRemove(colorId);
});