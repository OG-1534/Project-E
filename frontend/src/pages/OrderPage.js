// OrderPage.js

import React from 'react';
import './OrderPage.css'; // Import your custom styles if needed

const OrderPage = () => {
  // Simulated order data (replace this with actual order data)
  const orders = [
    {
      id: 1,
      product: 'Product A',
      date: '2024-10-01',
      status: 'Delivered',
      amount: '$58.20',
    },
    {
      id: 2,
      product: 'Product B',
      date: '2024-09-25',
      status: 'Pending',
      amount: '$34.50',
    },
    {
      id: 3,
      product: 'Product C',
      date: '2024-09-15',
      status: 'Canceled',
      amount: '$22.00',
    },
  ];

  return (
    <div className="container order-page">
      <h1 className="text-center my-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center">You have no orders yet.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.product}</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
                <td>{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderPage;
