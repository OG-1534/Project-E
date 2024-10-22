import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css'; // Assuming you have custom styles here
import logo from '../img/Afrigem Beauty.png'; // Adjust the path if necessary

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Afrigem Beauty" width="100" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#products">Products</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section text-center d-flex align-items-center justify-content-center">
        <div className="hero-content">
          <h1>Welcome to Afrigem Beauty</h1>
          <p>Your trusted platform for dermatologist-approved skincare products.</p>
          <a href="/dashboard" className="btn btn-primary btn-lg">Get Started</a>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <i className="bi bi-heart-fill icon-lg"></i>
              <h3>Dermatologist-Approved</h3>
              <p>Expertly curated products to keep your skin healthy.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-palette icon-lg"></i>
              <h3>Wide Range of Products</h3>
              <p>All kinds of beauty products to match your skin tone.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-phone icon-lg"></i>
              <h3>Virtual Consultation</h3>
              <p>Get personalized advice from our skincare professionals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Our Products</h2>
          <div className="row">
            {/* Product items here */}
            <div className="col-md-4">
              <div className="card">
                <img src="path-to-image" className="card-img-top" alt="Product" />
                <div className="card-body">
                  <h5 className="card-title">Product 1</h5>
                  <p className="card-text">Description of product 1.</p>
                  <a href="/product-details" className="btn btn-outline-primary">Buy Now</a>
                </div>
              </div>
            </div>
            {/* Add more products similarly */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
