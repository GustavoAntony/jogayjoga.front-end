import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  // Crie e estilize este arquivo conforme necessário

function HomePage() {
  return (
    <div className="mainContainer">
      <h1>Bem vindo ao 
        JOGAYJOGA
      </h1>
      <div className="buttonContainer">
        <Link to="/sport" className="inputButton">Sports</Link>
        <Link to="/court" className="inputButton">Courts</Link>
        <Link to="/group" className="inputButton">Groups</Link>
      </div>
    </div>
  );
}

export default HomePage;
