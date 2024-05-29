// GroupDetail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importe o axios normalmente
import { useParams, useNavigate } from 'react-router-dom';

function GroupDetail() {
  const [group, setGroup] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtenha o token do localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Adicione o token ao cabeçalho de autorização
      },
    };

    axios.get(`http://localhost:8080/group/${id}`, config) // Passe o config como segundo argumento
      .then(response => setGroup(response.data))
      .catch(error => console.error('There was an error!', error));
  }, [id]);

  const handleDelete = () => {
    const token = localStorage.getItem('token'); // Obtenha o token do localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Adicione o token ao cabeçalho de autorização
      },
    };

    axios.delete(`http://localhost:8080/group/${id}`, config) // Passe o config como segundo argumento
      .then(() => navigate('/group'))
      .catch(error => console.error('There was an error!', error));
  };

  if (!group) return <div>Loading...</div>;

  return (
    <div className="mainContainer">
      <h1>{group.name}</h1>
      <div className="detailContainer">
        <p>Description: {group.description}</p>
        <p>Members: {group.qtdMembers}</p>
        <p>Sport ID: {group.sportId}</p>
      </div>
      <div className="inputContainer">
        <button onClick={handleDelete} className="inputButton">Delete</button>
        <br />
        <Link to={`/group/${id}/edit`} className="inputButton">Edit</Link>
        <br />
        <Link to="/group" className="inputButton">Back to List</Link>
      </div>
    </div>
  );
}

export default GroupDetail;
