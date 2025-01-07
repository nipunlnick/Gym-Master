import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTrainer = ({ trainerDetails, isEditMode, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [assignedClasses, setAssignedClasses] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // When in edit mode, populate the form with the existing trainer details
    useEffect(() => {
        const fetchTrainersDetails = async () => {
            if (isEditMode && trainerDetails) {
                try {
                    // Retrieve the idToken from localStorage
                    const idToken = localStorage.getItem('idToken');

                    // Send PUT request to update trainer
                    const response = await axios.get(`http://localhost:5000/trainers/${trainerDetails}`, {
                        headers: {
                            Authorization: `Bearer ${idToken}`, // Replace with your actual token
                        },
                    });

                    const newTrainerData = response.data;

                    // Populate the form with the trainer details to edit
                    setName(newTrainerData.name || '');
                    setSpecialty(newTrainerData.specialty || '');
                    setAssignedClasses(newTrainerData.assignedClasses || '');
                    setContactInfo(newTrainerData.contactInfo || '');
                } catch (error) {
                    console.error('Error fetching trainers:', error);
                }
            }
        };

        fetchTrainersDetails();
    }, [isEditMode, trainerDetails]);

    // Validate and create new trainer
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !contactInfo) {
            setError('Name and Contact Info are required!');
            return;
        }

        try {
            const trainerData = {
                name,
                specialty,
                assignedClasses,
                contactInfo,
            };

            // Retrieve the idToken from localStorage
            const idToken = localStorage.getItem('idToken');

            if (isEditMode && trainerDetails) {
                // Send PUT request to update trainer
                await axios.put(`http://localhost:5000/trainers/${trainerDetails}`, trainerData, {
                    headers: {
                        Authorization: `Bearer ${idToken}`, // Replace with your actual token
                    },
                });
                setSuccess('Trainer updated successfully!');
            } else {
                // Send POST request to create new trainers
                await axios.post('http://localhost:5000/trainers', trainerData, {
                    headers: {
                        Authorization: `Bearer ${idToken}`, // Replace with your actual token
                    },
                });
                setSuccess('Trainer created successfully!');
            }

            // Reset form state
            setError('');
            setName('');
            setSpecialty('');
            setAssignedClasses('');
            setContactInfo('');
            onCreate();
            onClose();
        } catch (error) {
            setError('Error creating/updating trainer: ' + error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isEditMode ? 'Edit Trainer' : 'Create Trainer'}</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Trainer Name</label>
                        <input
                            type="text"
                            placeholder="Trainer Name"
                            value={name || ''}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">specialty</label>
                        <input
                            type='text'
                            placeholder='specialty'
                            value={specialty || ''}
                            onChange={(e) => setSpecialty(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Assigned Classes</label>
                        <input
                            type="text"
                            value={assignedClasses || ''}
                            onChange={(e) => setAssignedClasses(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Mobile Number</label>
                        <input
                            type="text"
                            placeholder="Mobile Number"
                            value={contactInfo || ''}
                            onChange={(e) => setContactInfo(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        {isEditMode ? 'Update Trainer' : 'Create Trainer'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTrainer;