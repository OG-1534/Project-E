// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming you have a CSS file for styling
import logo from '../img/Afrigem Beauty.png'; // Path to your logo

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Afrigem Beauty Logo" className="logo" />
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/consultation">Consultation</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
