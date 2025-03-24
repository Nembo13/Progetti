// routes/contactRoutes.js
const express = require('express');
const router = express.Router();

// Importa il controller per i contatti
const { createContact } = require('../controllers/contactController');

/**
 * @route   POST /api/contacts
 * @desc    Salva una nuova richiesta di contatto (dal form "Chi Siamo")
 *         Questa rotta è aperta, non necessita di autenticazione.
 */
router.post('/', createContact);

module.exports = router;