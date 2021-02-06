const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const passport = require('passport');
const bcrypt = require('bcryptjs');

router.post(
  '/profile/register',
  passport.authenticate('register'),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.send('Could not find user');
      }

      req.login(req.user, () => {
        return res.send(req.user);
      });
    } catch (error) {
      return res.send(error);
    }
  }
);

router.post(
  '/profile/login',
  passport.authenticate('login'),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.send('Could not find user');
      }

      req.login(req.user, () => {
        return res.send(req.user);
      });
    } catch (error) {
      return res.send(error);
    }
  }
);

router.get('/profile', async (req, res) => {
  try {
    const { username, email } = req.user;

    if (req.isAuthenticated()) {
      return res.send({
        username,
        email,
        id: req.user.user_id,
      });
    }
  } catch (error) {
    return res.json(error);
  }
});

router.get('/profile/logout', async (req, res) => {
  await req.logout();
  return res.send('Successfully logged out');
});

router.put('/profile', async (req, res) => {
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

router.delete('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
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
