import React, { useState, useEffect } from 'react';
import api from '../services/api';
import CategoryBanner from '../components/CategoryBanner';
import './Catalog.css';

function Catalog() {
  // Definiamo le tre categorie
  const categories = ["Office Bagpacks", "Adventure Bagpacks", "Bags"];
  // Stato per memorizzare i prodotti per ogni categoria
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let results = {};
        // Per ogni categoria eseguiamo una richiesta GET con il parametro di query "category"
        for (let category of categories) {
          const response = await api.get('/products', {
            params: { category }
          });
          results[category] = response.data;
        }
        setProductsByCategory(results);
      } catch (error) {
        console.error('Errore nel recuperare i prodotti:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="catalog-page">
      <h1>Catalogo Prodotti</h1>
      {categories.map((category) => (
        <div key={category}>
          {productsByCategory[category] && (
            <CategoryBanner category={category} products={productsByCategory[category]} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Catalog;