import React from 'react'
import { motion } from 'framer-motion';
import he from 'he';
import PropTypes from 'prop-types';

export default function Answers({ index, answer, selectedAnswer, currentQuestion, setSelectedAnswer, setScore, score }) {

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
    return (
        <> <li key={index}>
            <motion.button whileHover={{ scale: 1.1 }}
                className={`answer-button ${selectedAnswer && handleFeedback(answer)
                    }`}
                onClick={() => handleAnswerSelection(answer)}
                disabled={selectedAnswer !== ''}
            >
                {he.decode(answer)}
            </motion.button>
        </li>
        </>
    )
}

Answers.propTypes = {
    index: PropTypes.number.isRequired,
    answer: PropTypes.string.isRequired,
    handleAnswerSelection: PropTypes.func.isRequired,
    selectedAnswer: PropTypes.string.isRequired,

    currentQuestion: PropTypes.object.isRequired,
};