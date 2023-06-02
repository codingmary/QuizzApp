import React from 'react'

export default function DifficultySetup({ difficulties, selectedDifficulty, setSelectedDifficulty }) {
    return (
        <> <label htmlFor="difficulty" className="game-setup__label">
            Difficulty:
        </label>
            <select
                id="difficulty"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="game-setup__dropdown"
            >
                <option value="">Select a difficulty level</option>
                {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                        {difficulty}
                    </option>
                ))}
            </select>
        </>
    )
}
