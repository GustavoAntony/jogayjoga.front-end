import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return null; // or you can return a loading spinner if you want
};

export default RedirectToLogin;
