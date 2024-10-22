// src/pages/ProductPage.js

import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import Search from '../components/SearchBar';
import './ProductPage.css'; // Create this CSS file for styling

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="product-page">
      <h1>Product Listings</h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProductList searchTerm={searchTerm} />
    </div>
  );
};

export default ProductPage;
