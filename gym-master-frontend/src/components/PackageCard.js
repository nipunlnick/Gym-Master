import React from 'react';

const PackageCard = ({ packageId, name, price, duration, description, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-full max-w-xs">
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <p className="text-gray-600 mt-2">{description}</p>
            <div className="mt-4">
                <p className="text-gray-500">
                    <strong>Price:</strong> ${price}
                </p>
                <p className="text-gray-500">
                    <strong>Duration:</strong> {duration}
                </p>
            </div>
            <div className="mt-4 flex justify-between">
                <button
                    onClick={() => onEdit(packageId)}
                    className="text-blue-500 hover:text-blue-700"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(packageId)}
                    className="text-red-500 hover:text-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default PackageCard;