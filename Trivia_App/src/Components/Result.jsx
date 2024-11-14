import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get score and total from location.state
  const { score, total } = location.state || {};

  // If score or total is missing, redirect to home
  if (score === undefined || total === undefined) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <h1>Quiz Results</h1>
      <p>Your Score: {score} out of {total}</p>
      <button onClick={() => navigate("/")}>Return to Home</button>
    </div>
  );
}

export default Results;
