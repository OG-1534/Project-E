// src/components/CartItem.js
import React from 'react';
import './CartItem.css';

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const handleIncrease = () => {
    if (onQuantityChange) {
      onQuantityChange(item.id, item.quantity + 1); // Increase quantity
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1 && onQuantityChange) {
      onQuantityChange(item.id, item.quantity - 1); // Decrease quantity
    }
  };

  return (
    <div className="cart-item">
      <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
      <div className="cart-item-info">
        <h3 className="cart-item-title">{item.name}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>
      <div className="cart-item-quantity">
        <button className="quantity-button" onClick={handleDecrease}>-</button>
        <span className="quantity-display">{item.quantity}</span>
        <button className="quantity-button" onClick={handleIncrease}>+</button>
      </div>
      <button className="remove-button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;