require('dotenv').config();
const express = require('express');
const cors = require('cors');
const todoRouter = require('./src/routes/todo');
const userRouter = require('./src/routes/user');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);
app.use(todoRouter);

app.listen(5000, () => {
  console.log('Listening on 5000');
});
