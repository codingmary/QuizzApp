import React, { useState, useEffect } from 'react';
import "./GameSetup.scss"
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const GameSetup = ({ onStartGame }) => {

    const [categories, setCategories] = useState([]);
    const [difficulties, setDifficulties] = useState(['easy', 'medium', 'hard']);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
        // fetchDifficulties();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://opentdb.com/api_category.php');
            setCategories(response.data.trivia_categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // const fetchDifficulties = async () => {
    //     try {
    //         setDifficulties(['easy', 'medium', 'hard']); // Pre-defined difficulties for simplicity
    //     } catch (error) {
    //         console.error('Error fetching difficulties:', error);
    //     }
    // };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleDifficultyChange = (event) => {
        setSelectedDifficulty(event.target.value);
    };

    const handleStartGame = () => {
        onStartGame(selectedCategory, selectedDifficulty);
        navigate('/play');

    };
    return (
        <div className="game-setup__container">
            <div className="game-setup">
                <h2 className="game-setup__title">Game Setup</h2>
                <div className="game-setup__select">
                    <label htmlFor="category" className="game-setup__label">
                        Category:
                    </label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
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
                        onChange={handleDifficultyChange}
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

GameSetup.propTypes = {
    onStartGame: PropTypes.func.isRequired,
};