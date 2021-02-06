import React from 'react';
import axios from 'axios';

export const UserContext = React.createContext({});

const Context = (props) => {
  const [user, setUser] = React.useState({});
  const [todos, setTodos] = React.useState([]);
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    getUser();
    getTodos();
  }, [todos.length]);

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/profile', {
        withCredentials: true,
      });

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logOutUser = async () => {
    try {
      await axios.get('http://localhost:5000/profile/logout', {
        withCredentials: true,
      });
      setUser({});
      setTodos([]);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/todos',
        { description },
        { withCredentials: true }
      );

      getTodos();
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todos', {
        withCredentials: true,
      });

      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/todos/${id}`, {
        withCredentials: true,
      });

      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        logOutUser,
        getTodos,
        deleteTodo,
        todos,
        addTodo,
        description,
        setDescription,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default Context;
