import React from 'react';
import EditTodo from './EditTodo';

const ListTodo = () => {
  const [todos, setTodos] = React.useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos');
      const json = await response.json();

      setTodos(json);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getTodos();
  }, [todos]);

  return (
    <table className="table table-bordered mt-5">
      <thead>
        <tr>
          <th>Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <td>
              <EditTodo todo={todo} />
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => deleteTodo(todo.todo_id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListTodo;
