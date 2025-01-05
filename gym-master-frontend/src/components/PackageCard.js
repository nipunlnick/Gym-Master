import React from 'react';

const Card = ({ planName, price }) => {
    return (
        <div className="bg-gradient-to-r from-purple-500 to-purple-300 text-white p-6 rounded-xl shadow-md text-center">
            <h2 className="text-4xl font-bold">{planName}</h2>
            <p className="text-xl font-bold my-2">{price} LKR</p>
        </div>
    );
};

export default Card;
