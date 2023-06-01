import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import './ResultsPage.scss'

export const ResultsPage = ({ score, setScore }) => {
    const navigate = useNavigate();

    const restartGame = () => {
        setScore(0);
        navigate('/');
    };

    return (
        <div className="result-container">
            <h2>final score: {score}</h2>
            <button className="play-again-btn" onClick={restartGame}>Play Again</button>
        </div>
    )
}

ResultsPage.propTypes = {
    score: PropTypes.number.isRequired,
    setScore: PropTypes.func.isRequired,
}