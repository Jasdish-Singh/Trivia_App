import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// The Results component displays the final score and feedback message
function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve score and total number of questions from the Quiz page
  const { score, total } = location.state || {};

  // Redirect to home if score or total is missing
  if (score === undefined || total === undefined) {
    navigate('/');
    return null;
  }

  const feedbackMessage = score / total > 0.7 ? "Great job!" : "Better luck next time!";

  return (
    <div className="results-container">
      <h1>Quiz Results</h1>
      <p>Your Score: {score} out of {total}</p>
      <p>{feedbackMessage}</p>
      <button onClick={() => navigate("/")} className="return-button">Return to Home</button>
    </div>
  );
}

export default Results;
