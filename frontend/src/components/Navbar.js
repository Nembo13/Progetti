// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const token = localStorage.getItem('token');
  const [mobileMenu, setMobileMenu] = useState(false); // Stato per gestire l'apertura del menu mobile
  const [dropdownVisible, setDropdownVisible] = useState(false); // Stato per gestire il dropdown dell'avatar (utente loggato)
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleAvatarClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setDropdownVisible(false);
    setMobileMenu(false);
    navigate('/login');
  };

  const handleHistory = () => {
    setDropdownVisible(false);
    setMobileMenu(false);
    navigate('/quotes/history');
  };

  return (
    <nav className="navbar">
      {/* Logo fisso a sinistra */}
      <div className="navbar-logo">
        <Link to="/">
          <img src="/logo.svg" alt="LymeCo Logo" className="logo" />
        </Link>
      </div>

      {/* Menu Desktop: visualizzato in desktop tramite media query */}
      <div className="desktop-menu">
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catalog">Catalogo</Link>
          </li>
          <li>
            <Link to="/about">Chi Siamo</Link>
          </li>
        </ul>
        <ul className="navbar-auth">
          {!token ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          ) : (
            <li className="navbar-user">
              <FaUserCircle
                size={32}
                onClick={handleAvatarClick}
                style={{ cursor: 'pointer' }}
              />
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <button onClick={handleHistory}>Storico Preventivi</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>

      {/* Icona hamburger per dispositivi mobili */}
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {mobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {/* Menu Mobile unificato: contiene tutte le opzioni (home, catalogo, chi siamo + login/signup o avatar) */}
      <div className={`mobile-menu ${mobileMenu ? 'active' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => setMobileMenu(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/catalog" onClick={() => setMobileMenu(false)}>
              Catalogo
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMobileMenu(false)}>
              Chi Siamo
            </Link>
          </li>
          {!token ? (
            <>
              <li>
                <Link to="/login" onClick={() => setMobileMenu(false)}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" onClick={() => setMobileMenu(false)}>
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <li className="navbar-user-mobile">
              <FaUserCircle
                size={32}
                onClick={handleAvatarClick}
                style={{ cursor: 'pointer' }}
              />
              {dropdownVisible && (
                <div className="dropdown-menu-mobile">
                  <button onClick={handleHistory}>Storico Preventivi</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;