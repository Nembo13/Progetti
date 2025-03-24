import React, { useState } from 'react';
import api from '../services/api';
import DownloadQuoteButton from './DownloadQuoteButton';
import './ProductPopup.css';

/**
 * Popup modal per configurare e generare un preventivo.
 * Mostra i campi: colore (opzionale), tipo di stampa e quantità.
 * Dopo la generazione, visualizza il pulsante per scaricare il PDF.
 */
function ProductPopup({ product, closePopup }) {
  const [color, setColor] = useState('');
  const [printingType, setPrintingType] = useState('standard');
  const [quantity, setQuantity] = useState(1);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Gestisce l'invio del form per generare il preventivo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/quotes', {
        productId: product._id,
        quantity,
        printingType
        // Nota: il campo color viene usato solo a livello di UI, non nel calcolo del backend
      });
      setQuote(response.data);
    } catch (err) {
      console.error('Errore nella creazione del preventivo:', err);
      setError('Errore nella creazione del preventivo.');
    }
    setLoading(false);
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-button" onClick={closePopup}>X</button>
        <h2>Genera Preventivo per {product.name}</h2>
        {!quote ? (
          <form onSubmit={handleSubmit} className="popup-form">
            <label>
              Colore :
              <select value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="Blu">Blu</option>
                <option value="Verde">Verde</option>
                <option value="Bianco">Bianco</option>
                <option value="Nero">Nero</option>
               </select> 
            </label>
            <label>
              Tipo di stampa:
              <select value={printingType} onChange={(e) => setPrintingType(e.target.value)}>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </label>
            <label>
              Quantità:
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min="1"
              />
            </label>
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Generazione in corso...' : 'Genera Preventivo'}
            </button>
          </form>
        ) : (
          <div className="quote-result">
            <p>Preventivo creato con successo!</p>
            <p>Prezzo finale: €{quote.finalPrice.toFixed(2)}</p>
            <DownloadQuoteButton quoteId={quote._id} token={localStorage.getItem('token')} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPopup;