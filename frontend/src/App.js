// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa i componenti di layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importa le pagine principali
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CategoryDetail from './pages/CategoryDetail'; 
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import QuotesHistory from './pages/QuotesHistory';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar visibile in tutte le pagine */}
        <Navbar />
        {/* Routes per gestire le pagine */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/category/:categoryName" element={<CategoryDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/quotes/history" element={<QuotesHistory />} />
        </Routes>
        {/* Footer comune a tutte le pagine */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;