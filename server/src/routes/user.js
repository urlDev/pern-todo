const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const passport = require('passport');
const bcrypt = require('bcryptjs');

router.post('/profile/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await pool.query(
      'INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    return res.send(user.rows[0]);
  } catch (error) {
    return res.json(error.message);
  }
});

router.post(
  '/profile/login',
  passport.authenticate('local'),
  async (req, res) => {
    try {
      const user = req.user;

      if (!user) {
        return res.send('Could not find user');
      }

      req.logIn(user, () => {
        return res.send(user);
      });
    } catch (error) {
      return res.send(error);
    }
  }
);

router.get('/profile', passport.authenticate('local'), async (req, res) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      req.user.id,
    ]);

    return res.json(user);
  } catch (error) {
    return res.json(error);
  }
});

router.put('/profile', passport.authenticate('local'), async (req, res) => {
  try {
    const { id } = req.user;
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await pool.query(
      'UPDATE users SET username = $1, email = $2, password = $3 WHERE user_id = $4 RETURNING *',
      [username, email, hashedPassword, id]
    );

    return res.send(user.rows[0]);
  } catch (error) {
    return res.json(error.message);
  }
});

router.delete('/profile', passport.authenticate('local'), async (req, res) => {
  try {
    const { id } = req.user;
    // Deleting all todos belongs to this user
    await pool.query('DELETE FROM todo WHERE user_id = $1', [id]);

    const user = await pool.query(
      'DELETE FROM users WHERE user_id = $1 RETURNING *',
      [id]
    );

    return res.send(user.rows[0]);
  } catch (error) {
    return res.json(error.message);
  }
});

module.exports = router;
