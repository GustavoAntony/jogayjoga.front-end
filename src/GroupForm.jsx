import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function GroupForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [qtdMembers, setQtdMembers] = useState('');
  const [sportId, setSportId] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.get(`http://localhost:8080/group/${id}`, config)
        .then(response => {
          const group = response.data;
          setName(group.name);
          setDescription(group.description);
          setQtdMembers(group.qtdMembers);
          setSportId(group.sportId);
        })
        .catch(error => console.error('There was an error!', error));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const group = { name, description, qtdMembers: parseInt(qtdMembers, 10), sportId };
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (id) {
      axios.put(`http://localhost:8080/group/${id}`, group, config)
        .then(() => navigate('/group'))
        .catch(error => console.error('There was an error!', error));
    } else {
      axios.post('http://localhost:8080/group', group, config)
        .then(() => navigate('/group'))
        .catch(error => console.error('There was an error!', error));
    }
  };

  return (
    <div className="mainContainer">
      <h1>{id ? 'Edit Group' : 'Create Group'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="inputBox" />
        </div>
        <div className="inputContainer">
          <label>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required className="inputBox" />
        </div>
        <div className="inputContainer">
          <label>Members</label>
          <input type="number" value={qtdMembers} onChange={(e) => setQtdMembers(e.target.value)} required className="inputBox" />
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

export default GroupForm;

