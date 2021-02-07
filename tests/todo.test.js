const pool = require('../src/db/db');
const request = require('supertest');
const app = require('../app');
const { userSaved, cookie } = require('./user.test');

console.log(userSaved, cookie);

test('Should add a new todo', async () => {});
