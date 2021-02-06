import React from 'react';
import axios from 'axios';
import { UserContext } from '../Context';

const Register = () => {
  const { getUser, getTodos } = React.useContext(UserContext);
  const initialState = {
    username: '',
    email: '',
    password: '',
  };

  const [{ username, email, password }, setInput] = React.useState(
    initialState
  );

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `/profile/register`,

        { username, email, password },
        {
          withCredentials: true,
        }
      );

      getUser();
      getTodos();
      setInput(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          name="username"
          onChange={handleChange}
        />
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

export default Register;
