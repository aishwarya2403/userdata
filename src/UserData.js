import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you have Axios installed

const UserData = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleSortByTitleLength = (order) => {
    const sortedTodos = [...todos].sort((a, b) => {
      if (order === 'asc') {
        return a.title.length - b.title.length;
      } else {
        return b.title.length - a.title.length;
      }
    });
    setTodos(sortedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title
                <button onClick={() => handleSortByTitleLength('asc')}>Sort by Title Length Asc</button>
                <button onClick={() => handleSortByTitleLength('desc')}>Sort by Title Length Desc</button>
            </th>
            <th>Complete</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed?'True':'False'}</td>
              <td><button onClick={() => handleDelete(todo.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;