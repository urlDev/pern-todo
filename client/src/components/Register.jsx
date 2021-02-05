import React from 'react';
import axios from 'axios';

const Register = () => {
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
      const response = await axios.post(
        `http://localhost:5000/profile/register`,

        { username, email, password },
        {
          withCredentials: true,
        }
      );

      console.log(response);
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
