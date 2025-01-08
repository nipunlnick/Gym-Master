import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const PackageCard = ({ packageId, name, price, duration, description, memberCount, onEdit, onDelete }) => {
    return (
        <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl rounded-lg p-8 mb-4 w-full hover:shadow-2xl">
            <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                {/* Package Name */}
                <h3 className="text-4xl font-extrabold text-indigo-600 mb-2">
                    {name}
                </h3>

                {/* Price */}
                <p className="text-2xl font-bold text-gray-900 mb-2">
                    LKR {price}
                </p>

                {/* Duration */}
                <p className="text-sm text-gray-500 mb-4">
                    {duration} Plan
                </p>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                    {description}
                </p>

                {/* Edit and Delete Buttons */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => onEdit(packageId)}
                        className="bg-green-100 text-green-500 px-4 py-2 rounded-lg flex items-center"
                    >
                        <FaEdit className="mr-2" />
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(packageId)}
                        className="bg-red-100 text-red-500 px-4 py-2 rounded-lg flex items-center"
                    >
                        <FaTrash className="mr-2" />
                        Delete
                    </button>
                </div>
            </div>

            {/* Popular Badge based on member count */}
            {memberCount > 10 && (
                <div className="absolute top-0 right-0 mt-2 mr-2 bg-green-400 text-green-900 font-bold text-xs px-2 py-1 rounded-full shadow-lg">
                    Popular
                </div>
            )}
        </div>
    );
};

export default PackageCard;
