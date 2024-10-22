// LoginPage.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginPage.css'; // Import your custom styles if needed

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory(); // Use useHistory to navigate after login

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Replace this with your actual authentication logic
    if (email === 'user@example.com' && password === 'password') {
      // Redirect to the home page after successful login
      history.push('/'); // Adjust the path as needed
    } else {
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <div className="container login-page">
      <h1 className="text-center my-4">Login</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
