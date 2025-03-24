import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import ProductPopup from '../components/ProductPopup';
import './CategoryDetail.css';

function CategoryDetail() {
  // Otteniamo la categoria dalla URL
  const { categoryName } = useParams();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Richiama l'endpoint del backend per i prodotti filtrati per categoria
        const response = await api.get('/products', {
          params: { category: categoryName }
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Errore nel recuperare i prodotti:", error);
      }
    };

    fetchProducts();
  }, [categoryName]);

  // Gestione del click sul pulsante "Crea preventivo"
  const handleCreateQuote = (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Devi essere loggato per creare un preventivo.");
      navigate("/login");
    } else {
      setSelectedProduct(product);
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  return (
    <div className="category-detail">
      <h1>{categoryName}</h1>
      <div className="product-list">
        {products.map((prod) => (
          <div key={prod._id} className="product-row">
            {/* Colonna sinistra: immagine */}
            <div className="product-image">
              <img src={prod.imageUrl || '/placeholder.png'} alt={prod.name} />
            </div>
            {/* Colonna destra: descrizione e dettagli */}
            <div className="product-details">
              <div>
                <h3>{prod.name}</h3>
                <p>{prod.description}</p>
                <p><strong>Prezzo Base:</strong> €{prod.basePrice}</p>
              </div>
              <button onClick={() => handleCreateQuote(prod)}>Crea preventivo</button>
            </div>
          </div>
        ))}
      </div>
      {showPopup && selectedProduct && (
        <ProductPopup product={selectedProduct} closePopup={closePopup} />
      )}
    </div>
  );
}

export default CategoryDetail;