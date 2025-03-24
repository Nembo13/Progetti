// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Imposta il segreto JWT; se non definito nell'ambiente, usa un valore di fallback.
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

/**
 * Middleware che protegge le rotte controllando la presenza e
 * validità del token JWT nell'header Authorization.
 */
exports.protect = async (req, res, next) => {
  let token;
  
  // Verifica se l'header Authorization esiste e inizia con "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Estrae il token
      token = req.headers.authorization.split(' ')[1];
      // Verifica il token utilizzando il segreto
      const decoded = jwt.verify(token, JWT_SECRET);
      // Recupera l'utente dal database (escludendo la password)
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Non autorizzato, token non valido' });
    }
  }
  
  // Se nessun token è stato trovato
  if (!token) {
    return res.status(401).json({ message: 'Non autorizzato, nessun token fornito' });
  }
};