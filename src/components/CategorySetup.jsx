import React from 'react';
import PropTypes from 'prop-types';


export default function CategorySetup({ categories, selectedCategory, setSelectedCategory }) {


    return (
        <>        <select
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
        </>
    )
}

CategorySetup.propTypes = {
    categories: PropTypes.array.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    setSelectedCategory: PropTypes.func.isRequired,
};