import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './GamePage.scss';
import Loader from '../components/Loader';
import { Questions } from '../components/Questions';




export const GamePage = ({ playerName, questions, score, setScore, setQuestions, getQuestions }) => {
  const [questionIndex, setQuestionIndex] = useState(0);


  if (questions.length === 0) {
    return <div className="game">
      <Loader />
    </div>
  }

  return (
    <div className="game">
      <div className="game-header">
        <h2 className='welcome-text'>Welcome, {playerName}!</h2>
        <div className="question-info">
          <p>Question {questionIndex + 1} / {questions.length}</p>
          <p>Score: {score}</p>
        </div>
      </div>
      <Questions questionIndex={questionIndex} questions={questions} score={score} setScore={setScore} setQuestionIndex={setQuestionIndex} />

    </div>


  )
}





GamePage.propTypes = {
  playerName: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  setQuestions: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired,
};