import { useState, useEffect } from 'react';
import { supabase } from '../api/supabase';

import '../styles/Dashboard.css';

const Dashboard = ({ history }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    const { data } = await supabase.from('todo').select('*');

    setTodos(data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await supabase.from('todo').insert([{ title, description }]).single();

    setTitle('');
    setDescription('');

    getTodos();
  };

  const handleDeleteTodo = async (id) => {
    await supabase.from('todo').delete().match({ id });
    getTodos();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="dashboard__container">
          <h1 className="dashboard__title">Todo Supabase</h1>
          <div className="dashboard__input">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="dashboard__button">
            <button type="submit">Create Todo</button>
          </div>
        </div>
      </form>
      <div className="dashboard__listTodo">
        {!todos.length && <h3>Please input your daily activity !</h3>}
      </div>
      <div className="dashboard__listTodo">
        <div>
          {todos &&
            todos.map((todo, index) => (
              <div className="dashboard__resultTodoContainer" key={todo.id}>
                <div>
                  {index + 1}. {todo.title} - {todo.description}{' '}
                </div>
                <div className="dashboard__deleteTodo">
                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    Delete
                  </button>
                </div>
                <div className="dashboard__editTodo">
                  <button onClick={() => history.push(`/edit/${todo.id}`)}>
                    Edit
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
