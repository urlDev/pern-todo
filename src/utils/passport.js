const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const pool = require('../db/db');

passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, cb) => {
      try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [
          email,
        ]);

        if (!user) {
          return cb(null, false);
        }

        const isValid = await bcrypt.compare(password, user.rows[0].password);

        if (!isValid) {
          return cb(null, false);
        }

        return cb(null, user.rows[0]);
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.use(
  'register',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, cb) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 8);

        const user = await pool.query(
          'INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *',
          [username, req.body.email, hashedPassword]
        );

        if (!user) {
          return cb(null, false);
        }

        return cb(null, user.rows[0]);
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.user_id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      id,
    ]);
    return cb(null, user.rows[0]);
  } catch (error) {
    return cb(error);
  }
});
