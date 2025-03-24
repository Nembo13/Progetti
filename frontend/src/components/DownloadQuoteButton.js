// src/components/DownloadQuoteButton.js
import React from 'react';
import axios from 'axios';
import './DownloadQuoteButton.css';

/**
 * Componente per scaricare il PDF del preventivo.
 * @param {Object} props
 * @param {string} props.quoteId - L'ID del preventivo.
 * @param {string} props.token - Il token JWT dell'utente.
 */
const DownloadQuoteButton = ({ quoteId, token }) => {
  const handleDownload = async () => {
    try {
      // Richiesta GET all'endpoint per generare il PDF.
      const response = await axios.get(`http://localhost:5001/api/pdf/quote/${quoteId}`, {
        responseType: 'blob', // Trattiamo la risposta come file binario
        headers: { Authorization: `Bearer ${token}` },
      });
      // Creiamo un URL temporaneo per il blob
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      // Creiamo un elemento <a> per forzare il download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `preventivo_${quoteId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Errore durante il download del preventivo:', error);
    }
  };

  return (
    <button className="download-button" onClick={handleDownload}>
      Scarica il tuo preventivo
    </button>
  );
};

export default DownloadQuoteButton;