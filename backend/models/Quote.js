// models/Quote.js
const mongoose = require('mongoose');

/**
 * Schema per il preventivo (Quote).
 * Contiene:
 * - user: riferimento all'utente che ha creato il preventivo.
 * - product: riferimento al prodotto per cui si richiede il preventivo.
 * - quantity: quantità di prodotti desiderati.
 * - printingType: tipo di stampa scelto ("standard" o "premium").
 * - finalPrice: prezzo finale calcolato.
 */
const QuoteSchema = new mongoose.Schema(
  {
    // Riferimento all'utente (deve essere autenticato)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Riferimento al prodotto per cui si sta creando il preventivo
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    // Quantità di prodotti richiesti
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    // Tipo di stampa scelto (es. "standard" oppure "premium")
    printingType: {
      type: String,
      required: true,
    },
    // Prezzo finale calcolato, basato sul prezzo base, quantità e moltiplicatore per il tipo di stampa
    finalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Aggiunge automaticamente i campi createdAt e updatedAt
  }
);

module.exports = mongoose.model('Quote', QuoteSchema);