// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Quiz from './Components/Quiz';      
import Result from './Components/Result'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />           
      <Route path="/quiz" element={<Quiz />} />        
      <Route path="/results" element={<Result />} />  
    </Routes>
  );
}

export default App;
