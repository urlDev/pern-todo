const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const pool = require('../db/db');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, cb) => {
        try {
          const user = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
          );

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

  passport.serializeUser((user, cb) => {
    cb(null, user.user_id);
  });

  passport.deserializeUser((id, cb) => {
    pool.query('SELECT * FROM users WHERE user_id = $1', [id], (err, user) => {
      cb(err, user);
    });
  });
};
