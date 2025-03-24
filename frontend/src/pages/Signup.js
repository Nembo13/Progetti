// src/pages/Signup.js
import React, { useState } from 'react';
import api from '../services/api';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

function Signup({ history }) {
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Effettua la registrazione tramite l'endpoint del backend
      const response = await api.post('/auth/register', signupData);
      localStorage.setItem('token', response.data.token);
      // Dopo la registrazione, reindirizza l'utente alla pagina del login
      navigate('/login');

    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      setErrorMessage('Errore durante la registrazione, riprova.');
    }
  };

  return (
    <div className="signup">
      <h1>Signup</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <input 
          type="text"
          name="name"
          placeholder="Nome e Cognome"
          value={signupData.name}
          onChange={handleChange}
          required
        />
        <input 
          type="email"
          name="email"
          placeholder="Email"
          value={signupData.email}
          onChange={handleChange}
          required
        />
        <input 
          type="password"
          name="password"
          placeholder="Password"
          value={signupData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrati</button>
      </form>
    </div>
  );
}

export default Signup;