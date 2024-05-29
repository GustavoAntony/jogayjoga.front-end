import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import CourtList from './CourtList';
import CourtForm from './CourtForm';
import CourtDetail from './CourtDetail';
import GroupList from './GroupList';
import GroupForm from './GroupForm';
import GroupDetail from './GroupDetail';
import SportList from './SportList';
import SportForm from './SportForm';
import SportDetail from './SportDetail';
import HomePage from './HomePage';  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<HomePage />} />  
        <Route path="/court" element={<CourtList />} />
        <Route path="/court/new" element={<CourtForm />} />
        <Route path="/court/:id/edit" element={<CourtForm />} />
        <Route path="/court/:id" element={<CourtDetail />} />
        <Route path="/group" element={<GroupList />} />
        <Route path="/group/new" element={<GroupForm />} />
        <Route path="/group/:id/edit" element={<GroupForm />} />
        <Route path="/group/:id" element={<GroupDetail />} />
        <Route path="/sport" element={<SportList />} />
        <Route path="/sport/new" element={<SportForm />} />
        <Route path="/sport/:id/edit" element={<SportForm />} />
        <Route path="/sport/:id" element={<SportDetail />} />
      </Routes>
    </Router>
  );
}

export default App;




