import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function CourtForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [capacity, setCapacity] = useState('');
  const [sportId, setSportId] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('token');
      axios.get(`http://localhost:8080/court/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const court = response.data;
          setName(court.name);
          setAddress(court.address);
          setCapacity(court.capacity);
          setSportId(court.sportId);
        })
        .catch(error => console.error('There was an error!', error));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const court = { name, address, capacity: parseInt(capacity, 10), sportId };
    const token = localStorage.getItem('token');

    if (id) {
      axios.put(`http://localhost:8080/court/${id}`, court, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => navigate('/court'))
        .catch(error => console.error('There was an error!', error));
    } else {
      axios.post('http://localhost:8080/court', court, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => navigate('/court'))
        .catch(error => console.error('There was an error!', error));
    }
  };

  return (
    <div className="mainContainer">
      <h1>{id ? 'Edit Court' : 'Create Court'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="inputBox" />
        </div>
        <div className="inputContainer">
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="inputBox" />
        </div>
        <div className="inputContainer">
          <label>Capacity</label>
          <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required className="inputBox" />
        </div>
        <div className="inputContainer">
          <label>Sport ID</label>
          <input type="text" value={sportId} onChange={(e) => setSportId(e.target.value)} required className="inputBox" />
        </div>
        <br />
        <div className="inputContainer">
          <button type="submit" className="inputButton">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CourtForm;



