// tests/cars.test.js
const request = require('supertest');
const app = require('../app');
const { sequelize, Owner } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Owner.create({ name: 'Jane', email: 'jane@example.com' });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Cars API', () => {
  test('create car with missing owner -> 400', async () => {
    const res = await request(app).post('/api/cars').send({ make: 'Nissan', model: 'Altima', year: 2018, ownerId: 9999 });
    expect(res.statusCode).toBe(400);
  });

  test('create car -> 201 and retrieve -> 200', async () => {
    const owner = await Owner.findOne();
    const create = await request(app).post('/api/cars').send({ make: 'Nissan', model: 'Altima', year: 2018, ownerId: owner.id });
    expect(create.statusCode).toBe(201);
    const id = create.body.id;
    const get = await request(app).get(`/api/cars/${id}`);
    expect(get.statusCode).toBe(200);
    expect(get.body.make).toBe('Nissan');
  });
});
