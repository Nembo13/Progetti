// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Importa i controller per le operazioni di autenticazione
const { registerUser, loginUser, getCurrentUser } = require('../controllers/authController');

// Importa il middleware per proteggere le rotte
const { protect } = require('../middlewares/authMiddleware');

/**
 * @route   POST /api/auth/register
 * @desc    Registra un nuovo utente
 */
router.post('/register', registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Effettua il login di un utente esistente
 */
router.post('/login', loginUser);

/**
 * @route   GET /api/auth/profile
 * @desc    Recupera il profilo dell'utente autenticato
 *         Questa rotta è protetta dal middleware 'protect'
 */
router.get('/profile', protect, getCurrentUser);

module.exports = router;