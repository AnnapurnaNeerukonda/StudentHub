import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Todo() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState('defaultUser');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
        const user = localStorage.getItem('uid');
       const response = await axios.get(`http://localhost:4000/api/todo/${user}`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  };

  const addTodo = async () => {
    try {
      await axios.post('http://localhost:4000/api/todo', {
        user,
        title,
        is_finished: false,
      });
      setTitle('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo', error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/todo/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo', error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span>{todo.title}</span>
            <button onClick={() => toggleTodo(todo._id)}>
              {todo.is_finished ? 'Mark as Not Finished' : 'Mark as Finished'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
