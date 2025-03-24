// models/Product.js
const mongoose = require('mongoose');

// Schema per il prodotto
const ProductSchema = new mongoose.Schema(
  {
    // Nome del prodotto (obbligatorio)
    name: {
      type: String,
      required: true,
    },
    // Descrizione del prodotto (obbligatoria)
    description: {
      type: String,
      required: true,
    },
    // Categoria del prodotto: può essere "Office Bagpacks", "Adventure Bagpacks" o "Bags"
    category: {
      type: String,
      enum: ['Office Bagpacks', 'Adventure Bagpacks', 'Bags'],
      required: true,
    },
    // Prezzo base per il prodotto (numero) - serve come riferimento per le personalizzazioni
    basePrice: {
      type: Number,
      required: true,
    },
    // URL dell'immagine del prodotto (opzionale)
    imageUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // Crea automaticamente i campi createdAt e updatedAt
  }
);

// Esporta il modello "Product"
module.exports = mongoose.model('Product', ProductSchema);