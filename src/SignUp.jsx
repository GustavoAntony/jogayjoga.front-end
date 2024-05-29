import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [name, setName] = useState(''); // Adicionei um campo para o nome
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login');
  };

  const validateForm = () => {
    let valid = true;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!name) {
      setNameError('Name is required');
      valid = false;
    }
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    return valid;
  };

  const onButtonClick = () => {
    if (validateForm()) {
      const accountData = {
        name: name,
        email: email,
        password: password,
      };

      axios.post('http://localhost:8080/auth/register', accountData)
        .then(response => {
          console.log('Account created successfully:', response.data);
          navigate('/login');
        })
        .catch(error => {
          console.error('There was an error creating the account!', error);
        });
    }
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Sign Up</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={name}
          placeholder="Enter your name here"
          onChange={(ev) => setName(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{nameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
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
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm your password here"
          onChange={(ev) => setConfirmPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{confirmPasswordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Sign up'} />
      </div>
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={redirectToLogin} value={'Login'} />
      </div>  
    </div>
  );
};

export default SignUp;
