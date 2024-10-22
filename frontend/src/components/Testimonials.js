// src/components/Testimonials.js

import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Stella Lawanson',
    text: 'I absolutely love Afrigem Beauty products! They have transformed my skin.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Catherine John',
    text: 'Great quality and fast shipping! Highly recommend this brand.',
    rating: 4,
  },
  {
    id: 3,
    name: 'Alice Johnson',
    text: 'Amazing customer service and wonderful products. Will definitely be back!',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="testimonial-cards">
        {testimonials.map(({ id, name, text, rating }) => (
          <div key={id} className="testimonial-card">
            <p className="testimonial-text">"{text}"</p>
            <p className="testimonial-name">- {name}</p>
            <div className="testimonial-rating">
              {'★'.repeat(rating)}
              {'☆'.repeat(5 - rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
