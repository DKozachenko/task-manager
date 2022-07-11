/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const supertest = require('supertest');
const bcrypt = require('bcryptjs');

const app = require('../app/app');
const CONFIG = require('../config/index');
const Users = require('../models/user');
//const logger = require('../logger/logger');
const request = supertest(app);

describe('/register endpoint', () => {
  let testUserId = '';
  const testPassword = 'test password';

  it('should register new user', async () => {
    const response = await request
      .post(`/${CONFIG.prefix}/auth/register`)
      .send({
        fullName: 'test fullname',
        mail: 'test mail',
        nickname: 'test nick',
        password: testPassword,
      });
    
    testUserId = response.body._id;
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(await bcrypt.compare(testPassword, response.body.password)).toBeTruthy();
  });

  it('should send message if mail is already in use', async () => {
    const response = await request
      .post(`/${CONFIG.prefix}/auth/register`)
      .send({
        fullName: 'test fullname',
        mail: 'test mail',
        nickname: 'test nick123',
        password: testPassword
      });
    
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('User with mail test mail is already exists');
  });

  it('should send message if nickname is already in use', async () => {
    const response = await request
      .post(`/${CONFIG.prefix}/auth/register`)
      .send({
        fullName: 'test fullname',
        mail: 'test mail123',
        nickname: 'test nick',
        password: testPassword
      });
    
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('User with nickname test nick is already exists');
  });

  afterAll(async () => {
    const response = await Users.findOneAndRemove(testUserId);
  });
});

// describe('/login endpoint', () => {
//   it('should return error message if user does not exist', async () => {
//     const response = await request
//       .post(`/${CONFIG.prefix}/auth/register`)
//       .send({
//         fullName: 'test fullname',
//         mail: 'test mail',
//         nickname: 'test nick',
//         password: 'test password'
//       });
//     expect(response.status).toBe(403);
//     expect(response.body.message).toBe('User with mail test mail is already exists');
//   });
// });
