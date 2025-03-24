// src/components/CategoryBanner.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryBanner.css';

function CategoryBanner({ category, products }) {
  // Stato locale per tenere traccia della slide corrente (inizialmente 0)
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Aggiorna lo slide corrente quando l'utente clicca su un dot
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="category-banner">
      {/* Overlay cliccabile che reindirizza alla pagina di dettaglio della categoria */}
      <div className="banner-overlay" onClick={() => navigate(`/catalog/category/${encodeURIComponent(category)}`)}>
        <h2>{category}</h2>
      </div>
      <div className="carousel">
        {/* Contenitore delle slide che viene traslato in base al currentSlide */}
        <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {products.map((prod) => (
            <div className="slide" key={prod._id}>
              <img
                src={prod.imageUrl || '/placeholder.png'}
                alt={prod.name}
                className="banner-image"
              />
            </div>
          ))}
        </div>
        {/* Dots per la navigazione manuale */}
        <div className="navigation-dots">
          {products.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryBanner;