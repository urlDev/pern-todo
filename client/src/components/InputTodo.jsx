import React from 'react';
import axios from 'axios';

const InputTodo = () => {
  const [description, setDescription] = React.useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/todos',
        { description },
        { withCredentials: true }
      );

      console.log(response);

      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="mt-5 text-center">Pern ToDo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </> //
  );
};

export default InputTodo;
