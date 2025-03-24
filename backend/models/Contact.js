// models/Contact.js
const mongoose = require('mongoose');

/**
 * Schema per il contatto (Contact).
 * Memorizza le informazioni inviate dall'utente tramite il form "Chi Siamo".
 */
const ContactSchema = new mongoose.Schema(
  {
    // Nome dell'utente (obbligatorio)
    firstName: {
      type: String,
      required: true,
    },
    // Cognome dell'utente (obbligatorio)
    lastName: {
      type: String,
      required: true,
    },
    // Email dell'utente (obbligatoria)
    email: {
      type: String,
      required: true,
    },
    // Numero di telefono (opzionale)
    phone: {
      type: String,
      default: '',
    },
    // Messaggio o richiesta particolare
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Registra data di creazione e aggiornamento
  }
);

module.exports = mongoose.model('Contact', ContactSchema);