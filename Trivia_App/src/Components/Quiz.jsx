import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// The Quiz component fetches questions and lets users answer them
function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category;

  // Redirect to the home page if no category was selected
  if (!category) {
    navigate('/');
    return null;
  }

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Fetch trivia questions from the API when the component loads
  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5&category=${category}&type=multiple`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && Array.isArray(data.results) && data.results.length > 0) {
          setQuestions(data.results);
        }
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, [category]);

  // Handle answer selection and update score if correct
  const handleAnswerSelect = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    if (questions[currentQuestionIndex].correct_answer === selectedOption) {
      setScore(score + 1);
    }
  };

  // Move to the next question or show the results if it’s the last question
  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      navigate("/results", { state: { score, total: questions.length } });
    }
  };

  if (isLoading) return <div className="loading-message">Loading questions...</div>;
  if (!questions || questions.length === 0) return <div className="error-message">No questions available. Try a different category.</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const allOptions = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

  return (
    <div className="quiz-container">
      <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
      <h3 dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

      <div className="options-container">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className="option-button"
            dangerouslySetInnerHTML={{ __html: option }}
            disabled={!!selectedAnswer}
          />
        ))}
      </div>

      {selectedAnswer && (
        <button onClick={handleContinue} className="continue-button">
          Continue
        </button>
      )}
    </div>
  );
}

export default Quiz;
