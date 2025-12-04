// tests/owners.test.js
const request = require('supertest');
const app = require('../app');
const { sequelize, Owner } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Owners API', () => {
  test('create owner (POST /api/owners) -> 201', async () => {
    const res = await request(app)
      .post('/api/owners')
      .send({ name: 'Test Owner', email: 'test.owner@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('test.owner@example.com');
  });

  test('get owners (GET /api/owners) -> 200', async () => {
    const res = await request(app).get('/api/owners');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('validation error when creating owner with bad email -> 400', async () => {
    const res = await request(app).post('/api/owners').send({ name: 'Bad', email: 'not-an-email' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
