// src/components/CheckoutForm.js
import React, { useState } from 'react';
import './CheckoutForm.css';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to an API or process payment
    console.log('Form submitted:', formData);
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Checkout</h2>

      <div className="form-group">
        <label className="label" htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="input"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="input"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          className="input"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          className="input"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          name="state"
          className="input"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="zip">Zip Code</label>
        <input
          type="text"
          id="zip"
          name="zip"
          className="input"
          value={formData.zip}
          onChange={handleChange}
          required
        />
      </div>

      <h3 className="form-title">Payment Information</h3>

      <div className="form-group">
        <label className="label" htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          className="input"
          value={formData.cardNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="expiration">Expiration Date (MM/YY)</label>
        <input
          type="text"
          id="expiration"
          name="expiration"
          className="input"
          value={formData.expiration}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="cvv">CVV</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          className="input"
          value={formData.cvv}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-button">Complete Purchase</button>
    </form>
  );
};

export default CheckoutForm;