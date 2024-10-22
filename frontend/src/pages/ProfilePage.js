// ProfilePage.js

import React, { useState } from 'react';
import './ProfilePage.css'; // Import your custom styles if needed

const ProfilePage = () => {
  // Simulated user data (replace this with actual user data)
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
  });

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Replace this with your actual update logic
    console.log('Updated user information:', { name, email, password });
    setErrorMessage('');
    alert('Profile updated successfully!');
  };

  return (
    <div className="container profile-page">
      <h1 className="text-center my-4">Profile Page</h1>
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
          <label htmlFor="password" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
