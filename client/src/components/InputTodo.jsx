import React from 'react';

const InputTodo = () => {
  const [description, setDescription] = React.useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { description };
      await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

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
