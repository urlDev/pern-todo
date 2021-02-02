require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    // description will go to VALUES
    // $1 is to add dynamic data
    // Returning returns newly added value
    const newTodo = await pool.query(
      // insert into todo tables description
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    );

    return res.json(newTodo.rows[0]);
  } catch (error) {
    return res.send(error);
  }
});

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');

    return res.json(allTodos.rows);
  } catch (error) {
    return res.send(error);
  }
});

app.get('/todos/:id', async (req, res) => {
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

app.put('/todos/:id', async (req, res) => {
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

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      'DELETE FROM todo WHERE todo_id = $1 RETURNING *',
      [id]
    );

    return res.send(deleteTodo.rows);
  } catch (error) {
    return res.send(error);
  }
});

app.listen(5000, () => {
  console.log('Listening on 5000');
});
