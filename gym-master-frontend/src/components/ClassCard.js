import React from 'react';

const ClassesCard = ({ className, time }) => {
    return (
        <div className="border border-gray-300 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-bold mb-2">{className}</h3>
            <p className="text-gray-500">{time}</p>
        </div>
    );
};

export default ClassesCard;
