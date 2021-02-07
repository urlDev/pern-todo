const pool = require('../src/db/db');
const request = require('supertest');
const app = require('../app');

const userOne = {
  username: 'Can',
  email: 'can@test.com',
  password: 'abc123',
};

const userTwo = {
  username: 'urlDev',
  email: 'can@can.com',
  password: 'password',
};

let cookieOne;
let cookieTwo;
let userSavedOne;
let userSavedTwo;

beforeAll(async () => {
  const responseOne = await request(app)
    .post('/profile/register')
    .send(userOne);
  userSavedOne = responseOne.body;
  cookieOne = responseOne.header['set-cookie'][0];

  const responseTwo = await request(app)
    .post('/profile/register')
    .send(userTwo);
  userSavedTwo = responseTwo.body;
  cookieTwo = responseTwo.header['set-cookie'][0];

  await request(app).post('/todos').set('cookie', cookieOne).send({
    description: 'Play video games',
    user_id: userSavedOne.user_id,
  });

  await request(app).post('/todos').set('cookie', cookieTwo).send({
    description: 'Learn GraphQL',
    user_id: userSavedTwo.user_id,
  });
});

afterAll(async () => {
  await pool.query('DELETE FROM todo WHERE user_id = $1', [
    userSavedOne.user_id,
  ]);
  await pool.query('DELETE FROM todo WHERE user_id = $1', [
    userSavedTwo.user_id,
  ]);
  await pool.query('DELETE FROM users WHERE email = $1', [userOne.email]);
  await pool.query('DELETE FROM users WHERE email = $1', [userTwo.email]);
});

test('Should add a new todo with userOnes session', async () => {
  const response = await request(app)
    .post('/todos')
    .set('cookie', cookieOne)
    .send({
      description: 'Finish making tests',
      user_id: userSavedOne.user_id,
    });

  // User one adds a to do, when authenticated
  expect(response.body.description).toBe('Finish making tests');
  // Checking if todo belongs to same user whos authenticated
  expect(response.body.user_id).toBe(userSavedOne.user_id);
});

test('Should not add a new todo when user is not authenticated', async () => {
  const response = await request(app).post('/todos').send({
    description: 'Finish making tests',
    user_id: userSavedOne.user_id,
  });

  expect(response.body).toEqual({ error: 'Not authenticated' });
});

test('Should get todos from first saved user', async () => {
  const response = await request(app).get('/todos').set('cookie', cookieOne);

  // Before all tests, I save a todo, and first test adds a todo as well
  // so user one has two todos
  expect(response.body).toHaveLength(2);
});

test('Should not get userOnes todos when userTwo is signed in', async () => {
  const response = await request(app).get('/todos').set('cookie', cookieTwo);

  // Second user only has one todo which is saved at the beginning of the test
  expect(response.body).toHaveLength(1);
});
