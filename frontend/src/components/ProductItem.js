// src/components/ProductItem.js
import React from 'react';
import './ProductItem.css'; // Importing the CSS for styling

const ProductItem = ({ product }) => {
  return (
    <div className="product-card">
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-description">
          {product.description}
        </p>
      </div>
      <div className="product-actions">
        <button className="action-button add-to-cart-button">
          Add to Cart
        </button>
        <button className="action-button view-details-button">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
