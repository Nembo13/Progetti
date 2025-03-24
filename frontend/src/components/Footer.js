// src/components/Footer.js
import React from 'react';
import './Footer.css'; // File di stile specifico per il Footer
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="social-icons">
        {/* Link ai profili social con target _blank per aprire in nuova scheda */}
        <a href="https://twitter.com/tuoprofilo" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://facebook.com/tuoprofilo" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://instagram.com/tuoprofilo" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
}

export default Footer;