// routes/productRoutes.js
const express = require('express');
const router = express.Router();

// Importa le funzioni dal controller dei prodotti
const { getAllProducts, getProductById, createProduct } = require('../controllers/productController');

/**
 * @route   GET /api/products
 * @desc    Recupera tutti i prodotti o filtra per categoria (usando ?category=)
 */
router.get('/', getAllProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Recupera i dettagli di un prodotto specifico tramite il suo ID
 */
router.get('/:id', getProductById);

/**
 * @route   POST /api/products
 * @desc    Crea un nuovo prodotto
 * Nota: Questa rotta è aperta per semplicità.
 */
router.post('/', createProduct);

module.exports = router;