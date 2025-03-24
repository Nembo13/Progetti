// routes/quoteRoutes.js
const express = require('express');
const router = express.Router();

// Importa le funzioni dal controller dei preventivi
const { createQuote, getUserQuotes } = require('../controllers/quoteController');

// Importa il middleware di autenticazione per proteggere le rotte
const { protect } = require('../middlewares/authMiddleware');

/**
 * @route   POST /api/quotes
 * @desc    Crea un nuovo preventivo (Quote)
 *         Rota protetta: solo per utenti autenticati.
 */
router.post('/', protect, createQuote);

/**
 * @route   GET /api/quotes
 * @desc    Recupera tutti i preventivi del'utente autenticato
 *         Rota protetta: solo per utenti autenticati.
 */
router.get('/', protect, getUserQuotes);

module.exports = router;