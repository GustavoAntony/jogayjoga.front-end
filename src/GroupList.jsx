import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function GroupList() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get('http://localhost:8080/group', config)
      .then(response => {
        if (Array.isArray(response.data)) {
          setGroups(response.data);
        } else {
          console.error('Invalid data format received from the server:', response.data);
        }
      })
      .catch(error => console.error('There was an error!', error));
  }, []);

  return (
    <div className="mainContainer">
      <h1>Groups</h1>
      <div className="inputContainer">
        <Link to="/group/new" className="inputButton">Create New Group</Link>
      </div>
      <ul className="listContainer">
        {groups.map(group => (
          <li key={group.id} className="listItem">
            <Link to={`/group/${group.id}`}>{group.name}</Link>
          </li>
        ))}
      </ul>
      <div className={'inputContainer'}>
        <button className={'inputButton'} onClick={() => navigate('/home')}>go to home</button>
      </div>
    </div>
  );
}

export default GroupList;
