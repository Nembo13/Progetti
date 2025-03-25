// src/services/api.js
import axios from 'axios';

// Crea un’istanza di Axios
const api = axios.create({
  baseURL: 'http://localhost:5001/api', 
});

// Aggiunge un interceptor per includere il token in ogni richiesta se presente in localStorage.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;