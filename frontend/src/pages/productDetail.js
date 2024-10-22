// ProductDetails.js

import React from 'react';
import { useParams } from 'react-router-dom';
import products from './products'; // Import the products array

const ProductDetails = () => {
  // Get the product ID from the URL
  const { productId } = useParams();

  // Find the product by ID (or name, depending on how you're identifying products)
  const product = products.find((p) => p.id === Number(productId));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-details">
      <img src={product.img} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <p>{product.description}</p> {/* Assuming you add a description to the product data */}
      <button>Add to Cart</button> {/* Example of an action button */}
    </div>
  );
};

export default ProductDetails;
