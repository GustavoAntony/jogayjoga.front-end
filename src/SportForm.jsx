import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function SportForm() {
  const [name, setName] = useState('');
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

      axios.get(`http://localhost:8080/sport/${id}`, config)
        .then(response => {
          const sport = response.data;
          setName(sport.name);
        })
        .catch(error => console.error('There was an error!', error));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const sport = { name };

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (id) {
      console.log('id', id);
      axios.put(`http://localhost:8080/sport/${id}`, sport, config)
        .then(() => navigate('/sport'))
        .catch(error => console.error('There was an error!', error));
    } else {
      //mostar erro
      console.log('entrou  o sem id');
      console.log(sport);
      console.log(config)
      axios.post('http://localhost:8080/sport', sport, config)
        .then(() => navigate('/sport'))
        .catch(error => console.error('There was an error!', error));
    }
  };

  return (
    <div className={'mainContainer'}>
      <h1>{id ? 'Edit Sport' : 'Create Sport'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={'inputContainer'}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={'inputBox'} />
        </div>
        <br />
        <div className={'inputContainer'}>
          <button type="submit" className={'inputButton'}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SportForm;

