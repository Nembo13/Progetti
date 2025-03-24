// src/pages/QuotesHistory.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import DownloadQuoteButton from '../components/DownloadQuoteButton';
import './QuotesHistory.css';

function QuotesHistory() {
  // Stato per memorizzare l'elenco dei preventivi
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // UseEffect per caricare l'elenco dei preventivi quando il componente viene montato
  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      setError('');
      try {
        // Richiama l'endpoint GET /api/quotes per ottenere tutti i preventivi dell'utente
        const response = await api.get('/quotes');
        setQuotes(response.data);
      } catch (err) {
        console.error("Errore nel recuperare i preventivi:", err);
        setError("Errore nel recuperare i preventivi. Riprova.");
      }
      setLoading(false);
    };

    fetchQuotes();
  }, []);

  return (
    <div className="quotes-history">
      <h1>Storico Preventivi</h1>
      {loading && <p>Caricamento preventivi...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && quotes.length === 0 && (
        <p>Non hai ancora creato alcun preventivo.</p>
      )}
      <div className="quotes-list">
        {quotes.map((quote) => (
          <div key={quote._id} className="quote-card">
            <div className="quote-info">
              <h3>{quote.product?.name || "Prodotto sconosciuto"}</h3>
              <p><strong>Prezzo Finale:</strong> €{quote.finalPrice.toFixed(2)}</p>
              <p>
                <strong>Data:</strong> {new Date(quote.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="quote-actions">
              {/* Bottone per il download del PDF */}
              <DownloadQuoteButton 
                quoteId={quote._id} 
                token={localStorage.getItem('token')}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuotesHistory;