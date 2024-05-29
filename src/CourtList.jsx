import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';



function CourtList() {
  const navigate = useNavigate();
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get('http://localhost:8080/court', config)
      .then(response => {
        if (Array.isArray(response.data)) {
          setCourts(response.data);
        } else {
          console.error('Invalid data format received from the server:', response.data);
        }
      })
      .catch(error => console.error('There was an error!', error));
  }, []);

  return (
    <div className="mainContainer">
      <h1>Courts</h1>
      <div className="inputContainer">
        <Link to="/court/new" className="inputButton">Create New Court</Link>
      </div>
      <ul className="listContainer">
        {courts.map(court => (
          <li key={court.id} className="listItem">
            <Link to={`/court/${court.id}`}>{court.name}</Link>
          </li>
        ))}
      </ul>
      <div className={'inputContainer'}>
        <button className={'inputButton'} onClick={() => navigate('/home')}>go to home</button>
      </div>
    </div>
  );
}

export default CourtList;
