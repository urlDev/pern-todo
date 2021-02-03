const express = require('express');
const router = express.Router();
const pool = require('../db/db');
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

router.post('/profile/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (!user) {
      return res.send({ error: 'Could not find user' });
    }

    const isValid = await bcrypt.compare(password, user.rows[0].password);

    if (!isValid) {
      return res.send({ error: 'Could not login' });
    }

    return res.send(user.rows[0]);
  } catch (error) {
    return res.send(error);
  }
});

router.get('/profile', async (req, res) => {
  try {
    const user = await pool.query('SELECT * FROM users');

    return res.json(user.rows);
  } catch (error) {
    return res.json(error.message);
  }
});

router.put('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
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
