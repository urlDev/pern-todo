const express = require('express');
const passport = require('passport');
const router = express.Router();
const pool = require('../db/db');

// Routes
router.post('/todos', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const { user_id } = req.user;
      const { description } = req.body;
      // description will go to VALUES
      // $1 is to add dynamic data
      // Returning returns newly added value
      const newTodo = await pool.query(
        // insert into todo tables description
        'INSERT INTO todo (description, user_id) VALUES($1, $2) RETURNING *',
        [description, user_id]
      );

      if (!newTodo) {
        return res.send({ Error: 'Could not create to do' });
      }

      return res.json(newTodo.rows[0]);
    }

    return res.send({ error: 'Not authenticated' });
  } catch (error) {
    return res.send(error);
  }
});

router.get('/todos', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const allTodos = await pool.query(
        'SELECT * FROM todo WHERE user_id = $1',
        [req.user.user_id]
      );

      return res.json(allTodos.rows);
    }
  } catch (error) {
    return res.send(error);
  }
});

router.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);

    return res.json(todo.rows[0]);
  } catch (error) {
    return res.send(error);
  }
});

router.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    // $1 means first variable means description in the array
    // $2 means second variable means id in the array
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *',
      [description, id]
    );
    return res.json(updateTodo.rows[0]);
  } catch (error) {
    return res.send(error);
  }
});

router.delete('/todos/:id', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const { id } = req.params;
      const deleteTodo = await pool.query(
        'DELETE FROM todo WHERE todo_id = $1 RETURNING *',
        [id]
      );
      return res.send(deleteTodo.rows);
    }
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
