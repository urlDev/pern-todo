require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const todoRouter = require('./src/routes/todo');
const userRouter = require('./src/routes/user');

const app = express();

require('./src/utils/passport');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    // putting origin here is important
    // no slash afterwards!
    // credentials are important
    credentials: true,
    origin: process.env.ORIGIN || 'http://localhost:3000', // <-- React app location
  })
);

if (process.env.NODE_ENV === 'production') {
  // serving the build folder from react
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// same secret with session
app.use(cookieParser(process.env.SECRET));
app.enable('trust proxy');
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(userRouter);
app.use(todoRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

module.exports = app;
