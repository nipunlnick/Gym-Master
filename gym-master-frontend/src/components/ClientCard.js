import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const ClientCard = ({ clientId, name, membershipPlan, joinedDate, onEdit, onDelete }) => {
    const navigate = useNavigate();
    const onView = (clientId) => {
        navigate(`/clients/${clientId}`);
    };

    return (
        <div className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg my-2">
            <div className="flex items-center space-x-4">
                <p className="font-bold">{name}</p>
                <p className="text-gray-500">{membershipPlan}</p>
                <p className="text-gray-500">{joinedDate}</p>
            </div>
            <div className="flex space-x-4">
                <button
                    className="bg-green-100 text-green-500 px-4 py-2 rounded-lg flex items-center"
                    onClick={() => onEdit(clientId)} >
                    <FaEdit className="mr-2" /> Edit
                </button>
                <button
                    className="bg-blue-100 text-blue-500 px-4 py-2 rounded-lg flex items-center"
                    onClick={() => onView(clientId)}
                >
                    <FaEye className="mr-2" /> View
                </button>
                <button
                    className="bg-red-100 text-red-500 px-4 py-2 rounded-lg flex items-center"
                    onClick={() => onDelete(clientId)} >
                    <FaTrash className="mr-2" /> Delete
                </button>
            </div>
        </div>
    );
};

export default ClientCard;
