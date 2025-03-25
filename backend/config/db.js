// config/db.js
const mongoose = require('mongoose');

// Imposta la stringa di connessione al database.
// Se la variabile ambiente MONGO_URI non è definita, utilizza un fallback.
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lymeco';

/**
 * Funzione asincrona per connettersi a MongoDB tramite Mongoose.
 */
const connectDB = async () => {
  try {
    // Connessione a MongoDB usando Mongoose
    const conn = await mongoose.connect(MONGO_URI, {

    });
    console.log(`Connesso a MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Errore di connessione a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;