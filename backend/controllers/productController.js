// controllers/productController.js
const Product = require('../models/Product');

/**
 * Recupera tutti i prodotti.
 * Se nell'URL viene passato un parametro di query "category", ritorna solo i prodotti di quella categoria.
 */
exports.getAllProducts = async (req, res) => {
  try {
    // Recupera la categoria dalla query string, se presente
    const category = req.query.category;
    let products;
    
    // Se viene specificata una categoria, filtra i prodotti
    if (category) {
      products = await Product.find({ category: category });
    } else {
      // Altrimenti, ritorna tutti i prodotti
      products = await Product.find();
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Recupera il prodotto in base all'ID passato come parametro.
 */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    // Se il prodotto non viene trovato, restituisce un errore 404
    if (!product) {
      return res.status(404).json({ message: 'Prodotto non trovato' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * (Opzionale) Crea un nuovo prodotto.
 * Nota: Per semplicità questa rotta non è protetta e può essere utilizzata per aggiungere prodotti.
 */
exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, basePrice, imageUrl } = req.body;
    
    // Crea un nuovo oggetto prodotto
    const newProduct = new Product({
      name,
      description,
      category,
      basePrice,
      imageUrl,
    });
    
    // Salva il nuovo prodotto nel database
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};