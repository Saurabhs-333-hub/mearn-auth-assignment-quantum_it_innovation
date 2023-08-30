import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import './Home.css';

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => {
        const res = response.data.user;
        setUsers(res);
        console.log('API response:', response.data.user);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.replace('/')
  };
  return (
    <div className="container">
      <h2>User Details</h2>
      <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
      {<div className="table">
        <div className="row header-row">
          <div className="cell">ID</div>
          <div className="cell">Name</div>
          <div className="cell">Email</div>
          <div className="cell">DOB</div>

        </div>
        {users.map(user => (
          <div className="row" key={user._id}>
            <div className="cell">{user._id}</div>
            <div className="cell">{user.name}</div>
            <div className="cell">{user.email}</div>
            <div className="cell">{user.dob}</div>

          </div>
        ))}
      </div>}
    </div>
  );
}

export default Home;
