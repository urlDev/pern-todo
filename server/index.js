require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passportConfig = require('./src/utils/passport');
const todoRouter = require('./src/routes/todo');
const userRouter = require('./src/routes/user');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // One day in ms
      maxAge: 86_400_000,
      secure: true,
    },
  })
);
passportConfig(passport);

// Cookie parser secret same with session
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.use(userRouter);
app.use(todoRouter);

app.listen(5000, () => {
  console.log('Listening on 5000');
});
