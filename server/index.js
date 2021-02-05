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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    // putting origin here is important
    // no slash afterwards!
    // credentials are important
    credentials: true,
    origin: 'http://localhost:3000', // <-- React app location
  })
);
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
passportConfig(passport);

app.use(userRouter);
app.use(todoRouter);

app.listen(5000, () => {
  console.log('Listening on 5000');
});
