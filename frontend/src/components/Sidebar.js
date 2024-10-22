// src/components/Sidebar.js

import React from 'react';
import { Nav } from 'react-bootstrap'; // Using Bootstrap Nav component
import './Sidebar.css'; // CSS for Sidebar

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <Nav className="flex-column">
        <Nav.Link href="#profile">Profile</Nav.Link>
        <Nav.Link href="#orders">Orders</Nav.Link>
        <Nav.Link href="#settings">Settings</Nav.Link>
        <Nav.Link href="#logout">Logout</Nav.Link>
      </Nav>
    </nav>
  );
};

export default Sidebar;
