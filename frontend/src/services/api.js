// src/services/api.js
import axios from 'axios';

// Crea un’istanza di Axios; qui impostiamo la baseURL che punta al nostro backend.
const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Aggiorna se usi un URL diverso.
});

// Aggiunge un interceptor per includere il token in ogni richiesta se presente in localStorage.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Puoi gestire il token anche tramite Context o Redux
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;