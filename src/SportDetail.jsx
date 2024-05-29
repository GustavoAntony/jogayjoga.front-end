import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function SportDetail() {
  const [sport, setSport] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get(`http://localhost:8080/sport/${id}`, config)
      .then(response => setSport(response.data))
      .catch(error => console.error('There was an error!', error));
  }, [id]);

  const handleDelete = () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.delete(`http://localhost:8080/sport/${id}`, config)
      .then(() => navigate('/sport'))
      .catch(error => console.error('There was an error!', error));
  };

  if (!sport) return <div>Loading...</div>;

  return (
    <div className={'mainContainer'}>
      <h1>{sport.name}</h1>
      <div className={'detailContainer'}>
        <p>Name: {sport.name}</p>
      </div>
      <div className={'inputContainer'}>
        <button onClick={handleDelete} className={'inputButton'}>Delete</button>
        <br />
        <Link to={`/sport/${id}/edit`} className={'inputButton'}>Edit</Link>
        <br />
        <Link to="/sport" className={'inputButton'}>Back to List</Link>
      </div>
    </div>
  );
}

export default SportDetail;
