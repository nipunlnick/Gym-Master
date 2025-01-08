import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ClassCard = ({ classId, name, day, startTime, endTime, trainer, onEdit, onDelete }) => {
    return (
        <div className="relative shadow-xl rounded-lg p-4 w-60 hover:shadow-2xl">
            <div className="bg-white rounded-lg">
                {/* Class Name */}
                <h3 className="text-4xl font-extrabold text-indigo-600 mb-2">
                    {name}
                </h3>

                {/* Schedule */}
                <p className="text-lg font-bold text-gray-900 mb-2">
                    {day}
                </p>
                <p className="text-lg font-bold text-gray-900 mb-2">
                    {startTime} - {endTime}
                </p>

                {/* Trainer */}
                <p className="text-sm text-gray-500 mb-4">
                    Trainer: {trainer}
                </p>

                {/* Edit and Delete Buttons */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => onEdit(classId)}
                        className="bg-green-100 text-green-500 px-4 py-2 rounded-lg flex items-center"
                    >
                        <FaEdit className="mr-2" />
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(classId)}
                        className="bg-red-100 text-red-500 px-4 py-2 rounded-lg flex items-center"
                    >
                        <FaTrash className="mr-2" />
                        Delete
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ClassCard;
