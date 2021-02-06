import React from 'react';
import axios from 'axios';
import { UserContext } from '../Context';

const Login = () => {
  const { getUser, getTodos } = React.useContext(UserContext);
  const initialState = {
    username: '',
    email: '',
    password: '',
  };
  const [{ email, password }, setInput] = React.useState(initialState);

  const handleSubmit = async (e) => {
    const user = {
      email,
      password,
    };

    e.preventDefault();

    try {
      await axios.post(`/profile/login`, user, {
        withCredentials: true,
      });

      getUser();
      getTodos();
      setInput(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          name="password"
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
