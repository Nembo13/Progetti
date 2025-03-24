// controllers/quoteController.js
const Quote = require('../models/Quote');
const Product = require('../models/Product');

/**
 * Crea un nuovo preventivo (Quote) per l'utente autenticato.
 * Aspetta nel body della richiesta:
 * - productId: ID del prodotto scelto.
 * - quantity: numero di prodotti richiesti.
 * - printingType: tipo di stampa ("standard" o "premium").
 *
 * La funzione calcola il prezzo finale in base al prezzo base del prodotto,
 * la quantità e un moltiplicatore: 1 per "standard", 1.2 per "premium".
 */
exports.createQuote = async (req, res) => {
  const { productId, quantity, printingType } = req.body;

  try {
    // Verifica che il prodotto esista, cercandolo nel database tramite il suo ID.
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Prodotto non trovato' });
    }

    // Definisci il moltiplicatore del prezzo in base al tipo di stampa.
    let multiplier = 1;
    if (printingType === 'premium') {
      multiplier = 1.2;
    }
    // Calcola il prezzo finale: basePrice * quantity * moltiplicatore.
    const finalPrice = product.basePrice * quantity * multiplier;

    // Crea un nuovo preventivo utilizzando il modello Quote.
    // Il campo "user" viene preso dal middleware di autenticazione (req.user)
    const newQuote = new Quote({
      user: req.user._id,
      product: product._id,
      quantity,
      printingType,
      finalPrice,
    });

    // Salva il preventivo nel database
    const savedQuote = await newQuote.save();
    res.status(201).json(savedQuote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Recupera tutti i preventivi (Quote) relativi all'utente autenticato.
 * Utilizza "req.user" impostato dal middleware di autenticazione.
 */
exports.getUserQuotes = async (req, res) => {
  try {
    // Trova tutti i preventivi il cui campo user corrisponde all'ID dell'utente autenticato.
    // Utilizza "populate" per includere informazioni di base sul prodotto.
    const quotes = await Quote.find({ user: req.user._id }).populate('product', 'name basePrice');
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};