// routes/pdfRoutes.js
const express = require('express');
const router = express.Router();

// Importa il controller per la generazione del PDF
const { generateQuotePDF } = require('../controllers/pdfController');

// Importa il middleware per proteggere la rotta
const { protect } = require('../middlewares/authMiddleware');

/**
 * @route   GET /api/pdf/quote/:id
 * @desc    Genera e restituisce il PDF relativo al preventivo con ID specificato.
 *         Rota protetta: richiede autenticazione.
 */
router.get('/quote/:id', protect, generateQuotePDF);

module.exports = router;