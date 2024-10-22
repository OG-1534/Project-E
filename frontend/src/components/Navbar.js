import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../img/Afrigem Beauty.png';  // Ensure this path is correct

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Afrigem Beauty Logo" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
