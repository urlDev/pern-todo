const pool = require('../src/db/db');
const request = require('supertest');
const app = require('../app');

const userOne = {
  user_id: '1',
  username: 'urlDev',
  email: 'can@example.com',
  password: 'cookies123',
};

test('Should register user', async () => {
  const response = await request(app).post('/profile/register').send(userOne);
});
