import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const navigate = useNavigate();
    const [selectedGenre, setSelectedGenre] = useState(null);

    const handleGenreSelect = (categoryId) => {
        setSelectedGenre(categoryId);
    };

    const handleContinue = () => {
        if (selectedGenre) {
            navigate('/quiz', { state: { category: selectedGenre } });
        }
    };

    return (
        <div className="homepage-container">
            <h1 className="homepage-header">Welcome to the Trivia App!</h1>
            <h2 className="homepage-subtitle">Select a Category:</h2>

            <button className="category-button">General Knowledge</button>
            <button className="category-button">Film</button>
            <button className="category-button">Music</button>
            <button className="category-button">Television</button>
            <button className="category-button">Video Games</button>

            <button
                onClick={handleContinue}
                className="continue-button"
                disabled={selectedGenre === null}
            >
                Continue
            </button>
        </div>
    );
}

export default HomePage;
