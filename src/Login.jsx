import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }

    return valid;
  };

  const onButtonClick = () => {
    if (validateForm()) {
      const credentials = {
        email: email,
        password: password,
      };

      axios.post('http://localhost:8080/auth/login', credentials)
        .then(response => {
          const token = response.data.token;
          console.log('Login successful, token:', token);
          localStorage.setItem('authToken', token); // Armazena o token no local storage
          navigate('/'); // Redireciona para a home page após o login
        })
        .catch(error => {
          console.error('There was an error logging in!', error);
          if (error.response && error.response.status === 401) {
            setEmailError('Invalid email or password');
          } else {
            setEmailError('An error occurred. Please try again.');
          }
        });
    }
  };

  const redirectToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="email"
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={redirectToSignUp} value={'Sign up'} />
      </div>
    </div>
  );
};

export default Login;


