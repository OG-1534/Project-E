// src/pages/Lifestyle.js
import React from 'react';
import '../styles/Lifestyle.css';

const Lifestyle = () => {
  const lifestyleArticles = [
    {
      id: 1,
      title: "Top 5 Beauty Tips for Glowing Skin",
      image: require('../img/beauty-tips.jpg'),
      description: "Discover the best beauty tips that will help your skin glow and look fresh.",
    },
    {
      id: 2,
      title: "Skincare Routine for Different Skin Types",
      image: require('../img/skincare-routine.jpg'),
      description: "Learn the best skincare routines based on your skin type.",
    },
    {
      id: 3,
      title: "Trending Fashion Styles for 2024",
      image: require('../img/fashion-trends.jpg'),
      description: "Check out the latest fashion trends and how to incorporate them into your wardrobe.",
    },
    // Add more articles as needed
  ];

  return (
    <div className="lifestyle-section">
      <h1>Lifestyle & Beauty Tips</h1>
      <div className="articles">
        {lifestyleArticles.map(article => (
          <div key={article.id} className="article-card">
            <img src={article.image} alt={article.title} />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lifestyle;
