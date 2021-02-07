const pool = require('../src/db/db');
const request = require('supertest');
const app = require('../app');

const userOne = {
  username: 'urlDev',
  email: 'can@example.com',
  password: 'cookies123',
};

let id;
let cookie;
let userSaved;

afterAll(async () => {
  await pool.query('DELETE FROM users WHERE email = $1', [userOne.email]);
});

test('Should register user', async () => {
  const response = await request(app).post('/profile/register').send(userOne);

  const user = response.body;
  id = user.id;
  cookie = response.header['set-cookie'][0];
  userSaved = user;

  // api call returns a user
  expect(user).not.toEqual({});
  // checking if password is hashed
  expect(user.password).not.toBe('cookies123');
});

test('Should login user', async () => {
  const response = await request(app)
    .post('/profile/login')
    .send({ email: userOne.email, password: userOne.password });

  const user = response.body;

  expect(user).not.toEqual({});
  // getting back the same user
  expect(user).toEqual(userSaved);
});

test('Should not login user with bad credentials', async () => {
  const response = await request(app)
    .post('/profile/login')
    .send({ email: userOne.email, password: 'cookies' });

  expect(response.text).toBe('Unauthorized');
  expect(response.status).toBe(401);
});

test('Should get user profile when authenticated', async () => {
  const response = await request(app).get('/profile').set('cookie', cookie);

  const user = response.body;

  expect(user).not.toEqual({});

  // getting the same user
  expect(user).toEqual({
    id: userSaved.user_id,
    username: userSaved.username,
    email: userSaved.email,
  });
});

test('Should not get user profile if cookies are not sent, user not logged in', async () => {
  const response = await request(app).get('/profile');

  const user = response.body;

  // not getting any user back
  expect(user).toEqual({});
});

test('Should log out successfully', async () => {
  const response = await request(app)
    .get('/profile/logout')
    .set('cookie', cookie);

  expect(response.text).toBe('Successfully logged out');
});
