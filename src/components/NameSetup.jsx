import React from 'react';
import PropTypes from 'prop-types';


export default function NameSetup({ playerName, setPlayerName }) {
    return (
        <>
            <label htmlFor="username" className="game-setup__label">
                Your name:
            </label>
            <input id="username" className="game-setup__input" type="text" placeholder="Enter your name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
            <label htmlFor="category" className="game-setup__label">
                Category:
            </label>
        </>
    )
}

NameSetup.propTypes = {
    playerName: PropTypes.string.isRequired,
    setPlayerName: PropTypes.func.isRequired,
}