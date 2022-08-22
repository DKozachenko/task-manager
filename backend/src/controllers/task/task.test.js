/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const supertest = require('supertest');

const app = require('../../app/app');
const CONFIG = require('../../config/index');
const Colors = require('../../models/color');
const Labels = require('../../models/label');
const Tasks = require('../../models/task');
const Users = require('../../models/user');
const request = supertest(app);

/** Тестовый объект задачи для тестов */
const testTask = {
  name: 'test task',
  description: 'test description',
  labelIds: []
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

/** Тестовый объект пользователя для тестов */
const testUser = {
  fullName: 'test fullname',
  mail: 'test mail',
  nickname: 'test nick',
  password: 'test password'
};

/** Id добавленного пользователя */
let testUserId = '';
/** Токен */
let testUserToken = '';

/** Перед всеми тестами запоминание кол-ва меток, добавление в БД двух тестовых меток и цвета */
beforeAll(async () => {
  const response = await request.post(`/${CONFIG.prefix}/auth/register`)
    .send(testUser);
  testUserId = response.body.data._id;
  
  const response2 = await request.post(`/${CONFIG.prefix}/auth/login`)
    .send(testUser);
  
  testUserToken = response2.body.data.token;
  
  const allTasks = await Tasks.find();
  initialTasksLength = allTasks.length;

  /** Сохранение тестового цвета */
  const testDbColor = new Colors({ 
    hexCode: testLabel.color.hexCode 
  });
  await testDbColor.save();
  colorId = testDbColor._id.toString();
  
  /** Сохранение тестовой метки, организация связи */
  const testDbLabel = new Labels({ 
    name: testLabel.name,
    colorId: colorId,
    userId: testUserId 
  });
  await testDbLabel.save();
  labelIds.push(testDbLabel._id.toString());

  testDbColor.labelIds.push(testDbLabel);
  await testDbColor.save();

  /** Сохранение двух задач, одна с меткой, другая - без */
  const testDbTask = new Tasks({ 
    name: testTask.name,
    description: testTask.description,
    labelIds: [testDbLabel._id],
    userId: testUserId
  });
  await testDbTask.save();
  taskIds.push(testDbTask._id.toString());

  testDbLabel.taskIds.push(testDbTask);
  await testDbLabel.save();

  const testDbTask2 = new Tasks({ 
    name: testTask.name,
    description: testTask.description,
    userId: testUserId
  });
  await testDbTask2.save();
  taskIds.push(testDbTask2._id.toString());
});

/** Тесты для получения всех записей */
describe('/getAll controller', () => {
  /** Тест получения всех задач без токена */
  it('should return tasks', async () => {
    const response = await request
      .get(`/${CONFIG.prefix}/tasks`);
    
    expect(response.error.text).toBe('Unauthorized');
    expect(response.status).toBe(401);
  });

  /** Тест получения всех задач */
  it('should return tasks', async () => {
    const response = await request
      .get(`/${CONFIG.prefix}/tasks`)
      .set('Authorization', testUserToken);
    
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(initialTasksLength + 2);
  });
});

/** Тесты для получения записи */
describe('/getById controller', () => {
  /** Тест получения задачи по существующему id */
  it('should return task by id if task exists', async () => {
    const response = await request
      .get(`/${CONFIG.prefix}/tasks/${taskIds[0]}`)
      .set('Authorization', testUserToken);
    
    expect(response.status).toBe(200);
  });

  /** Тест получения задачи по несуществующему id */
  it('should return task by id if task does not exist', async () => {
    const response = await request
      .get(`/${CONFIG.prefix}/tasks/${nonExistentId}`)
      .set('Authorization', testUserToken);
    
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Task with id ${nonExistentId} was not found`);
    expect(response.body.error).toBeTruthy();
  });
});

/** Тесты для добавления записи */
describe('/add controller', () => {
  /** Тест добавления задачи без меток */
  it('should return added task if is was added (without labels)', async () => {
    const response = await request
      .post(`/${CONFIG.prefix}/tasks`)
      .set('Authorization', testUserToken)
      .send(testTask);

    taskIds.push(response.body.data._id);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('_id');
  });

  /** Тест добавления задачи c меткой */
  it('should return added task if is was added (with labels)', async () => {
    const response = await request
      .post(`/${CONFIG.prefix}/tasks`)
      .set('Authorization', testUserToken)
      .send({
        ...testTask,
        labelIds: labelIds
      });

    taskIds.push(response.body.data._id);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data.labelIds).toHaveLength(1);
    expect(response.body.data.labelIds.map(item => item.toString())).toStrictEqual(labelIds);
  });

  /** Тест добавления задачи c несуществующей меткой */
  it('should return added task if is was added (with non-existend labels)', async () => {
    const response = await request
      .post(`/${CONFIG.prefix}/tasks`)
      .set('Authorization', testUserToken)
      .send({
        ...testTask,
        labelIds: [nonExistentId]
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Label with id ${nonExistentId} was not found`);
    expect(response.body.error).toBeTruthy();
  });
});

/** Тесты для обновления записи */
describe('/updateById controller', () => {
  /** Тест обновления задачи с несуществующим id */
  it('should return message if task does not exist', async () => {
    const response = await request
      .put(`/${CONFIG.prefix}/tasks/${nonExistentId}`)
      .set('Authorization', testUserToken)
      .send({
        name: testTask.name + 'updated',
        description: testTask.description + 'updated',
        labelIds: testTask.labelIds
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Task with id ${nonExistentId} was not found`);
  });

  /** Тест обновления задачи без меток */
  it('should return updated task if task exists (without labels)', async () => {
    const response = await request
      .put(`/${CONFIG.prefix}/tasks/${taskIds[2]}`)
      .set('Authorization', testUserToken)
      .send({
        name: testTask.name + 'updated',
        description: testTask.description + 'updated',
        labelIds: testTask.labelIds
      });

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe(testTask.name + 'updated');
    expect(response.body.data.description).toBe(testTask.description + 'updated');
    expect(response.body.data.labelIds).toHaveLength(0);
  });

  /** Тест обновления задачи c меткой */
  it('should return updated task if task exists (with labels)', async () => {
    const response = await request
      .put(`/${CONFIG.prefix}/tasks/${taskIds[3]}`)
      .set('Authorization', testUserToken)
      .send({
        name: testTask.name + 'updated',
        description: testTask.description + 'updated',
        labelIds: labelIds
      });

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe(testTask.name + 'updated');
    expect(response.body.data.description).toBe(testTask.description + 'updated');
    expect(response.body.data.labelIds).toHaveLength(1);
  });
  
  /** Тест обновления задачи c несуществующей меткой */
  it('should return updated task if task exists (with non-existend labels)', async () => {
    const response = await request
      .put(`/${CONFIG.prefix}/tasks/${taskIds[3]}`)
      .set('Authorization', testUserToken)
      .send({
        name: testTask.name + 'updated',
        description: testTask.description + 'updated',
        labelIds: [nonExistentId]
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Label with id ${nonExistentId} was not found`);
    expect(response.body.error).toBeTruthy();
  });

  
});

/** Тесты для удаления записей */
describe('/deleteById controller', () => {
  /** Тест удаления задачи с существующим id */
  it('should return success message if task exists', async () => {
    const allTasks = await Tasks.find();
    const currentTasksLength = allTasks.length;

    const response = await request
      .delete(`/${CONFIG.prefix}/tasks/${taskIds[2]}`)
      .set('Authorization', testUserToken);

    expect(response.status).toBe(200);
    expect(response.body.data.message).toBe(`Task with id ${taskIds[2]} was deleted`);
    
    const allTasksAfterDelete = await Tasks.find();
    const tasksLengthAfterDelete = allTasksAfterDelete.length;

    expect(tasksLengthAfterDelete).toBe(currentTasksLength - 1);
  });
  
  /** Тест удаления метки с несуществующим id */
  it('should return failed message if task does not exist', async () => {
    const response = await request
      .delete(`/${CONFIG.prefix}/tasks/${nonExistentId}`)
      .set('Authorization', testUserToken);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Task with id ${nonExistentId} was not found`);
    expect(response.body.error).toBeTruthy();
  });
});

/** После всех тестов удаление добавленных задач, меток, цвета и пользователя */
afterAll(async () => {
  for (const taskId of taskIds) {
    await Tasks.findByIdAndRemove(taskId);
  }

  for (const labelId of labelIds) {
    await Labels.findByIdAndRemove(labelId);
  }

  await Colors.findByIdAndRemove(colorId);
  await Users.findByIdAndRemove(testUserId);
});