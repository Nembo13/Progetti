// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Imposta il segreto JWT; se non definito nell'ambiente, usa un valore di fallback.
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

/**
 * Funzione helper per generare un token JWT.
 * @param {String} id - ID dell'utente.
 * @returns {String} Il token JWT.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

/**
 * Registra un nuovo utente.
 * Riceve dal body: name, email, password.
 */
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Controlla se esiste già un utente con la medesima email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Utente già esistente' });
    }
    
    // Crea un nuovo utente e lo salva nel database
    user = await User.create({ name, email, password });
    
    // Restituisce i dati dell'utente e il token JWT
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Effettua il login per un utente esistente.
 * Riceve dal body: email e password.
 * Se le credenziali sono corrette, restituisce i dati dell'utente e un token JWT.
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Cerca l'utente in base all'email fornita
    const user = await User.findOne({ email });
    // Se l'utente esiste e la password corrisponde
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Credenziali non corrette' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Recupera il profilo dell'utente autenticato.
 * La rotta è protetta: il token JWT viene verificato tramite il middleware 'protect'.
 */
exports.getCurrentUser = async (req, res) => {
  try {
    // Il middleware 'protect' aggiunge il campo req.user se il token è valido
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};