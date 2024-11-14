import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category;

  if (!category) {
    navigate('/');
    return null;
  }

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5&category=${category}&type=multiple`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && Array.isArray(data.results) && data.results.length > 0) {
          console.log("Fetched data:", data.results);
          setQuestions(data.results);
        } else {
          console.warn("No questions found in fetched data:", data);
        }
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, [category]);

  const handleAnswer = (selectedOption) => {
    if (questions[currentQuestionIndex].correct_answer === selectedOption) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/results", { state: { score, total: questions.length } });
    }
  };

  if (isLoading) return <div>Loading questions...</div>;
  if (!questions || questions.length === 0) return <div>No questions available. Try a different category.</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const allOptions = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

  return (
    <div>
      <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
      <h3 dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
      {shuffledOptions.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(option)}
          dangerouslySetInnerHTML={{ __html: option }}
        />
      ))}
    </div>
  );
}

export default Quiz;
