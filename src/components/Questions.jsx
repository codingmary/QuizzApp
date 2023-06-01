import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import "./Questions.scss"
import { useNavigate } from 'react-router-dom';

export const Questions = ({ questionIndex, questions, score, setScore, setQuestionIndex }) => {
    const [selectedAnswer, setSelectedAnswer] = useState('');

    const currentQuestion = questions[questionIndex];
    const navigate = useNavigate();


    const handleFeedback = (i) => {
        if (selectedAnswer === i && selectedAnswer === currentQuestion.correct_answer) {
            return "correct"
        } else if (selectedAnswer === i && selectedAnswer !== currentQuestion.correct_answer) {
            return "incorrect"
        } else if (i === currentQuestion.correct_answer) {
            return "correct"
        }
    }



    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);

        if (answer === currentQuestion.correct_answer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        if (questionIndex >= questions.length - 1) {
            navigate('/results');
        } else {
            setQuestionIndex(questionIndex + 1);
            setSelectedAnswer('');
        }
    };





    const sortedAnswers = useMemo(() => {
        const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
        return answers.sort(() => Math.random() - 0.5);
    }, [currentQuestion]);

    return (
        <div className="question-card">
            <h3>{currentQuestion.question}</h3>
            <ul>
                {sortedAnswers && sortedAnswers.map((answer, index) => (
                    <li key={index}>
                        <button
                            className={`answer-button ${selectedAnswer && handleFeedback(answer)
                                }`}
                            onClick={() => handleAnswerSelection(answer)}
                            disabled={selectedAnswer}

                        >
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>
            <button className="next-button" onClick={handleNextQuestion} disabled={selectedAnswer === ''}>
                Next
            </button>
        </div>
    )
}


Questions.propTypes = {
    questionIndex: PropTypes.number.isRequired,
    questions: PropTypes.array.isRequired,
    score: PropTypes.number.isRequired,
    setScore: PropTypes.func.isRequired,
    setQuestionIndex: PropTypes.func.isRequired,
};