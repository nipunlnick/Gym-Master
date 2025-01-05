import React from 'react';

const Card = ({ title, value }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-gray-500">{title}</p>
            <h3 className="text-4xl font-bold">{value}</h3>
        </div>
    );
};

export default Card;
