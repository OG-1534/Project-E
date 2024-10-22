// SignupPage.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SignupPage.css'; // Import your custom styles if needed

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory(); // Use useHistory to navigate after signup

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Replace this with your actual signup logic
    if (name && email && password) {
      // Simulate successful signup
      console.log('User signed up:', { name, email, password });
      
      // Redirect to the login page or home page after successful signup
      history.push('/login'); // Adjust the path as needed
    } else {
      setErrorMessage('Please fill in all fields.');
    }
  };

  return (
    <div className="container signup-page">
      <h1 className="text-center my-4">Sign Up</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
