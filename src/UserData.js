import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserData = () => {
  const [user, setUser] = useState([]);
  const [sortByLengthAsc, setSortByLengthAsc] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  const sortTodosByTitleLength = () => {
    const sortedtitle = [...user].sort((a, b) => {
      const titleLengthA = a.title.length;
      const titleLengthB = b.title.length;
      return sortByLengthAsc ? titleLengthA - titleLengthB : titleLengthB - titleLengthA;
    });
    setUser(sortedtitle);
    setSortByLengthAsc(!sortByLengthAsc);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>
                Title 
                <button onClick={sortTodosByTitleLength}>
                 {sortByLengthAsc ? 'Sort by Asc' : 'Sort by Desc'}
                </button>
            </th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {user.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>  
              <td>{user.title}</td>
              <td>{user.completed ? 'True' : 'False'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;