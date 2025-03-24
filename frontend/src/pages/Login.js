// src/pages/Login.js
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';


function Login({ history }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Effettua la chiamata all'endpoint per il login
      const response = await api.post('/auth/login', loginData);
      // Salva il token in localStorage per le richieste protette
      localStorage.setItem('token', response.data.token);
      
        // Dopo la registrazione, reindirizza l'utente alla pagina del catalogo
        navigate('/catalog');
    } catch (error) {
      console.error('Errore durante il login:', error);
      setErrorMessage('Credenziali non valide, riprova.');
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input 
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
        <input 
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Accedi</button>
      </form>
    </div>
  );
}

export default Login;