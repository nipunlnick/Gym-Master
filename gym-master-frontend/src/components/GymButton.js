import React from 'react';

const GymButton = ({ children, onClick }) => {
    return (
        <button
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default GymButton;
