// CheckoutPage.js

import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the checkout process (e.g., send data to API)
    alert('Checkout successful! Thank you for your order!');
    clearCart(); // Clear cart after successful checkout
  };

  return (
    <div className="container checkout-page">
      <h1 className="text-center my-4">Checkout</h1>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty! Please add items before checking out.</p>
      ) : (
        <div>
          <h2>Your Order Summary</h2>
          <ul className="list-group mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </li>
            ))}
          </ul>
          <h3>Total: {getTotalPrice()}</h3>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Shipping Address</label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Place Order</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
