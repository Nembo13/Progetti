// src/pages/About.js
import React, { useState } from 'react';
import api from '../services/api';
import './About.css';

function About() {
  // Stato per il form di contatto
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/contacts', contactData);
      setResponseMessage('Grazie per averci contattato!');
      setContactData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error("Errore nell'invio dei dati:", error);
      setResponseMessage('Si è verificato un errore. Riprova.');
    }
  };

  return (
    <div className="about">
      <h1>Chi Siamo</h1>
      <section className="about-content">
        <p>
          LymeCo è l'azienda leader nella brandizzazione di zaini per aziende.
          Con la nostra creatività e le tecnologie innovative, trasformiamo ogni
          zaino in un pezzo unico che rappresenta la tua identità aziendale.
        </p>
      </section>
      
      <section className="contact-form-section">
        <h2>Contattaci</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input 
            type="text"
            name="firstName"
            placeholder="Nome"
            value={contactData.firstName}
            onChange={handleChange}
            required
          />
          <input 
            type="text"
            name="lastName"
            placeholder="Cognome"
            value={contactData.lastName}
            onChange={handleChange}
            required
          />
          <input 
            type="email"
            name="email"
            placeholder="Email"
            value={contactData.email}
            onChange={handleChange}
            required
          />
          <input 
            type="text"
            name="phone"
            placeholder="Numero di telefono"
            value={contactData.phone}
            onChange={handleChange}
          />
          <textarea 
            name="message"
            placeholder="Il tuo messaggio"
            value={contactData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Invia</button>
        </form>
        {responseMessage && <p className="response-message">{responseMessage}</p>}
      </section>

      {/* Nuova sezione per informazioni sull'azienda */}
      <section className="company-info">
        <div className="location">
          <h2>Dove siamo</h2>
          <p>
            Siamo situati nell'area industriale di Tivoli, in Via Lago d'Albano 20, a pochi km dall'uscita
            dell'autostrada a 24 - uscita Tivoli
          </p>
          {/* Qui potresti inserire una mappa integrata o ulteriori dettagli */}
        </div>
        <div className="contacts">
          <h2>Contatti</h2>
          <ul>
            <li><strong>Telefono:</strong> +39 0774 330189</li>
            <li><strong>Società:</strong> LymeCommunication S.r.l.</li>
            <li><strong>Partita IVA:</strong> 12345678901</li>
            <li><strong>Indirizzo:</strong> Via Lago d'Albano 20, Tivoli(RM)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default About;