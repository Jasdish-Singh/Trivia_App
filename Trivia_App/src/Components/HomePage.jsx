import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path if necessary
import "../App.css";

// HomePage component allows users to select a trivia category and navigate to the quiz
function HomePage() {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Set the selected category when a button is clicked
  const handleGenreSelect = (categoryId) => {
    setSelectedGenre(categoryId);
  };

  // Navigate to the Quiz page, passing the selected category as state
  const handleContinue = () => {
    if (selectedGenre) {
      navigate('/quiz', { state: { category: selectedGenre } });
    }
  };

  return (
    <div className="homepage-container">
      {/* Logo Header */}
      <div className="header-logo">
        <img src={logo} alt="App Logo" />
      </div>

      {/* Page Title and Subtitle */}
      <h1 className="homepage-header">Welcome to the Trivia App!</h1>
      <h2 className="homepage-subtitle">Select a Category:</h2>

      {/* Category Selection Buttons */}
      <div className="category-selection-container">
        <button onClick={() => handleGenreSelect(9)} className="category-button">General Knowledge</button>
        <button onClick={() => handleGenreSelect(11)} className="category-button">Film</button>
        <button onClick={() => handleGenreSelect(12)} className="category-button">Music</button>
        <button onClick={() => handleGenreSelect(14)} className="category-button">Television</button>
        <button onClick={() => handleGenreSelect(15)} className="category-button">Video Games</button>
      </div>

      {/* Continue Button */}
      <button onClick={handleContinue} className="continue-button" disabled={selectedGenre === null}>
        Continue
      </button>
    </div>
  );
}

export default HomePage;
