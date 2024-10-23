// src/context/ProductContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts, addToCart } from '../api';

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productList = await fetchProducts();
        setProducts(productList);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    try {
      const updatedCart = await addToCart(productId, quantity);
      setCart(updatedCart); // Update the cart state with the new cart
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, cart, handleAddToCart }}>
      {children}
    </ProductContext.Provider>
  );
};