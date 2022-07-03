/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('./app');
const request = supertest(app);

describe('/test endpoint', () => {
  it('should return a response', async () => {
    const response = await request.get('/test');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Passed');
  });
});
