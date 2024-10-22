// src/pages/ProductList.js
import React from 'react';
import products from '../data/products';
import '../pages/ProductList.css'; // Import styles for Product List

const ProductList = () => {
  // Hardcoded array of products
  const products = [
    { id: 1, name: 'Moisturizer', price: 20.99 },
    { id: 2, name: 'Sunscreen', price: 15.99 },
  ];

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
