import React from 'react'

export default function ButtonStartGame({ handleStartGame, selectedCategory, selectedDifficulty }) {
    return (
        <>      <button
            onClick={handleStartGame}
            disabled={!selectedCategory || !selectedDifficulty}
            className="game-setup__button"
        >
            Start Game
        </button>
        </>
    )
}
