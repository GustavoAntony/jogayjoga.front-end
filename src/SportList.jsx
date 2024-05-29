import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams ,Link} from 'react-router-dom';


function SportList() {
  const navigate = useNavigate();
  const [sports, setSports] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get('http://localhost:8080/sport', config)
      .then(response => {
        if (Array.isArray(response.data)) {
          setSports(response.data);
        } else {
          console.error('Invalid data format received from the server:', response.data);
        }
      })
      .catch(error => console.error('There was an error!', error));
  }, []);

  return (
    <div className={'mainContainer'}>
      <h1>Sports</h1>
      <div className={'inputContainer'}>
        <Link to="/sport/new" className={'inputButton'}>Create New Sport</Link>
      </div>
      <ul className={'listContainer'}>
        {sports.map(sport => (
          <li key={sport.id} className={'listItem'}>
            <Link to={`/sport/${sport.id}`}>{sport.name}</Link>
          </li>
        ))}
      </ul>
      <div className={'inputContainer'}>
        <button className={'inputButton'} onClick={() => navigate('/home')}>go to home</button>
      </div>
    </div>
  );
}

export default SportList;

