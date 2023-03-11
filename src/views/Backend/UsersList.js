import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(res => {
        console.log(res.data);
        setUsers(res.data.users);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
