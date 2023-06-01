import React, { useState, useEffect } from 'react';
import "./Homepage.scss"
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const Homepage = ({ playerName, setPlayerName, questions, setQuestions }) => {

    const [categories, setCategories] = useState([]);
    const [difficulties, setDifficulties] = useState(['easy', 'medium', 'hard']);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://opentdb.com/api_category.php');
            setCategories(response.data.trivia_categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    const getQuestions = async (category, difficulty) => {
        try {
            const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
            setQuestions(response.data.results)
        } catch (error) {
            console.error('Error fetching questions:', error)
        }
    }

    const handleStartGame = () => {
        getQuestions(selectedCategory, selectedDifficulty);
        navigate('/play');
    };

    return (
        <div className="game-setup__container">
            <div className="game-setup">
                <h2 className="game-setup__title">Game Setup</h2>

                <div className="game-setup__select">
                    <label htmlFor="username" className="game-setup__label">
                        Your name:
                    </label>
                    <input id="username" className="game-setup__input" type="text" placeholder="Enter your name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
                    <label htmlFor="category" className="game-setup__label">
                        Category:
                    </label>

                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="game-setup__dropdown"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                </div>
                <div className="game-setup__select">
                    <label htmlFor="difficulty" className="game-setup__label">
                        Difficulty:
                    </label>
                    <select
                        id="difficulty"
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="game-setup__dropdown"
                    >
                        <option value="">Select a difficulty</option>
                        {difficulties.map((difficulty) => (
                            <option key={difficulty} value={difficulty}>
                                {difficulty}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleStartGame}
                    disabled={!selectedCategory || !selectedDifficulty}
                    className="game-setup__button"
                >
                    Start Game
                </button>
            </div>
        </div>
    )
}

Homepage.propTypes = {
    playerName: PropTypes.string.isRequired,
    setPlayerName: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    setQuestions: PropTypes.func.isRequired,
};