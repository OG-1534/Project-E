import React from 'react';
import './styles.css'; // Adjust the path to your CSS file
import logo from '../img/logo.png.png'; // Adjust the path as necessary

const HeroSection = () => {
    const heroStyle = {
        backgroundColor: '#FFB6C1', // Baby pink color
        color: 'white',
        padding: '60px 20px', // Padding around the section
        textAlign: 'center', // Center align text
    };

    return (
        <div style={heroStyle}>
            <img src={logo} alt="Afrigem Beauty Logo" className="logo" style={{ width: '150px', marginBottom: '20px' }} />
            <h1>Welcome to Afrigem Beauty</h1>
            <p>Your journey starts here!</p>
            <a href="/about" className="button">Learn More</a>
        </div>
    );
};

export default HeroSection;
