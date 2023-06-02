import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import "./Questions.scss"
import { useNavigate } from 'react-router-dom';
import he from 'he';
import { motion } from 'framer-motion';
import Answers from './Answers';

export const Questions = ({ questionIndex, questions, score, setScore, setQuestionIndex }) => {
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [countdown, setCountdown] = useState(30);


    const currentQuestion = questions[questionIndex];
    const navigate = useNavigate();


    useEffect(() => {
        if (countdown > 0 && selectedAnswer === '') {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            handleNextQuestion();
        }
    }, [countdown]);


    const handleNextQuestion = () => {
        if (questionIndex >= questions.length - 1) {
            navigate('/results');
        } else {
            setQuestionIndex(questionIndex + 1);
            setSelectedAnswer('');
            setCountdown(30);
        }
    };

    //useMemo used to avoid answers being sorted on every render
    const sortedAnswers = useMemo(() => {
        const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
        return answers.sort(() => Math.random() - 0.5);
    }, [currentQuestion]);


    return (
        <motion.div animate={{ y: 50, scale: 1 }} initial={{ scale: 0 }} className="question-card">
            <p >Time remaining: <span className={countdown <= 5 ? "countdown-red" : "countdown"}> {countdown}</span> seconds</p>
            <h3>{he.decode(currentQuestion.question)}</h3>
            <ul>
                {sortedAnswers && sortedAnswers.map((answer, index) => (
                    <>
                        <Answers index={index} answer={answer} setSelectedAnswer={setSelectedAnswer} score={score} setScore={setScore} selectedAnswer={selectedAnswer} currentQuestion={currentQuestion} />
                    </>
                ))}
                <button className="next-button" onClick={handleNextQuestion} disabled={selectedAnswer === ''}>Next</button>
            </ul>
        </motion.div >
    )
}


Questions.propTypes = {
    questionIndex: PropTypes.number.isRequired,
    questions: PropTypes.array.isRequired,
    score: PropTypes.number.isRequired,
    setScore: PropTypes.func.isRequired,
    setQuestionIndex: PropTypes.func.isRequired,
};