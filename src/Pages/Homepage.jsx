import { useState, useEffect } from 'react';
import "./Homepage.scss"
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NameSetup from '../components/NameSetup';
import CategorySetup from '../components/CategorySetup';
import DifficultySetup from '../components/DifficultySetup';
import ButtonStartGame from '../components/ButtonStartGame';

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


    const getQuestions = async (category = '9', difficulty = "easy") => {
        try {
            const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
            setQuestions(response.data.results)
        } catch (error) {
            console.error('Error fetching questions:', error)
        }
    }

    const handleStartGame = async () => {
        getQuestions(selectedCategory, selectedDifficulty);
        navigate('/play');
    };

    return (
        <motion.div animate={{ scale: 1 }} initial={{ scale: 0 }} className="game-setup__container">
            <div className="game-setup">
                <h2 className="game-setup__title">Game Setup</h2>
                <div className="game-setup__select">
                    <NameSetup playerName={playerName} setPlayerName={setPlayerName} />
                    <CategorySetup categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    <DifficultySetup difficulties={difficulties} selectedDifficulty={selectedDifficulty} setSelectedDifficulty={setSelectedDifficulty} />
                </div>
                <ButtonStartGame handleStartGame={handleStartGame} selectedCategory={selectedCategory} selectedDifficulty={selectedDifficulty} />
            </div>
        </motion.div>
    )
}

Homepage.propTypes = {
    playerName: PropTypes.string.isRequired,
    setPlayerName: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    setQuestions: PropTypes.func.isRequired,
};