import React from 'react';
import { UserContext } from '../Context';

const InputTodo = () => {
  const { addTodo, description, setDescription } = React.useContext(
    UserContext
  );

  return (
    <>
      <h1 className="mt-5 text-center">Pern ToDo List</h1>
      <form className="d-flex mt-5" onSubmit={addTodo}>
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
