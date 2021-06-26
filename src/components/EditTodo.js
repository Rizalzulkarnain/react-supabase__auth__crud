import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../api/supabase';

import '../styles/EditTodo.css';

const EditTodo = ({ history }) => {
  const [title, setTitle] = useState('');
  const [description, setTDescription] = useState('');

  const { editTodo } = useParams();
  useEffect(() => {
    getSingleTodo();

    // eslint-disable-next-line
  }, []);

  const getSingleTodo = async () => {
    if (!editTodo) return;
    const { data } = await supabase
      .from('todo')
      .select('*')
      .filter('id', 'eq', editTodo)
      .single();

    setTitle(data.title);
    setTDescription(data.description);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) return;
    await supabase
      .from('todo')
      .update({ title, description })
      .eq('id', 'editTodo');

    setTimeout(() => {
      history.push('/dashboard');
    }, 1000);
    getSingleTodo();
  };

  return (
    <div className="editTodo__container">
      <h3>Edit Todo</h3>

      <form onSubmit={handleSubmit}>
        <div className="editTodo__input">
          <input
            type="text"
            placeholder="Update Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="editTodo__input">
          <input
            type="text"
            placeholder="Update Description"
            onChange={(e) => setTDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="editTodo__button">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
