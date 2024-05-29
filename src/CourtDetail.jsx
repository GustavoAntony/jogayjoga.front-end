import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function CourtDetail() {
  const [court, setCourt] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8080/court/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => setCourt(response.data))
      .catch(error => console.error('There was an error!', error));
  }, [id]);

  const handleDelete = () => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:8080/court/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => navigate('/court'))
      .catch(error => console.error('There was an error!', error));
  };

  if (!court) return <div>Loading...</div>;

  return (
    <div className="mainContainer">
      <h1>{court.name}</h1>
      <div className="detailContainer">
        <p>Address: {court.address}</p>
        <p>Capacity: {court.capacity}</p>
        <p>Sport ID: {court.sportId}</p>
      </div>
      <div className="inputContainer">
        <button onClick={handleDelete} className="inputButton">Delete</button>
        <br />
        <Link to={`/court/${id}/edit`} className="inputButton">Edit</Link>
        <br />
        <Link to="/court" className="inputButton">Back to List</Link>
      </div>
    </div>
  );
}

export default CourtDetail;
