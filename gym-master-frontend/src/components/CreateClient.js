import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateClient = ({ clientDetails, isEditMode, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [membershipPlan, setMembershipPlan] = useState('Gold');
    const [joinedDate, setJoinedDate] = useState('');
    const [status, setStatus] = useState('Active');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Function to get today's date in the format 'YYYY-MM-DD'
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    // Set default joinedDate on form load if not in edit mode
    useEffect(() => {
        if (!isEditMode) {
            setJoinedDate(getTodayDate());
        }
    }, [isEditMode]);

    // When in edit mode, populate the form with the existing client details
    useEffect(() => {
        const fetchClientsDetails = async () => {
            if (isEditMode && clientDetails) {
                try {
                    // Retrieve the idToken from localStorage
                    const idToken = localStorage.getItem('idToken');

                    // Send PUT request to update client
                    const response = await axios.get(`http://localhost:5000/clients/${clientDetails}`, {
                        headers: {
                            Authorization: `Bearer ${idToken}`, // Replace with your actual token
                        },
                    });

                    const newClientData = response.data;

                    // Populate the form with the client details to edit
                    setName(newClientData.name || '');
                    setMembershipPlan(newClientData.membershipPlan || 'Gold');
                    setJoinedDate(newClientData.joinedDate || 'getTodayDate()');
                    setStatus(newClientData.status || 'Active');
                } catch (error) {
                    console.error('Error fetching clients:', error);
                }
            }
        };

        fetchClientsDetails();
    }, [isEditMode, clientDetails]);

    // Validate and create new client
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            setError('Name is required!');
            return;
        }

        try {
            const clientData = {
                name,
                membershipPlan,
                joinedDate,
                status,
            };

            // Retrieve the idToken from localStorage
            const idToken = localStorage.getItem('idToken');

            if (isEditMode && clientDetails) {
                // Send PUT request to update client
                await axios.put(`http://localhost:5000/clients/${clientDetails}`, clientData, {
                    headers: {
                        Authorization: `Bearer ${idToken}`, // Replace with your actual token
                    },
                });
                setSuccess('Client updated successfully!');
            } else {
                // Send POST request to create new clients
                await axios.post('http://localhost:5000/clients', clientData, {
                    headers: {
                        Authorization: `Bearer ${idToken}`, // Replace with your actual token
                    },
                });
                setSuccess('Client created successfully!');
            }

            // Reset form state
            setError('');
            setName('');
            setMembershipPlan('Gold');
            setJoinedDate(getTodayDate());
            setStatus('Active');
            onCreate();
            onClose();
        } catch (error) {
            setError('Error creating/updating client: ' + error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isEditMode ? 'Edit Client' : 'Create Client'}</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Member Name</label>
                        <input
                            type="text"
                            placeholder="Member Name"
                            value={name || ''}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">MembershipPlan</label>
                        <select
                            value={membershipPlan || 'Gold'}
                            onChange={(e) => setMembershipPlan(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg mt-2">
                            <option value="Gold">Gold</option>
                            <option value="Platinum">Platinum</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Joined Date</label>
                        <input
                            type="date"
                            value={joinedDate || ''}
                            onChange={(e) => setJoinedDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Status</label>
                        <div className="flex items-center">
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Active"
                                    checked={status === 'Active'}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="mr-2"
                                />
                                Active
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Inactive"
                                    checked={status === 'Inactive'}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="mr-2"
                                />
                                Inactive
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        {isEditMode ? 'Update Client' : 'Create Client'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateClient;