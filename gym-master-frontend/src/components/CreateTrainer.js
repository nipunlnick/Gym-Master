import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTrainer = ({ trainerDetails, isEditMode, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [availableClasses, setAvailableClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(''); // Only storing selected class
    const [contactInfo, setContactInfo] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch available classes on component mount
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/classes');
                setAvailableClasses(response.data); // Assuming 'data' is the array of classes
            } catch (error) {
                console.error('Error fetching classes:', error);
                setAvailableClasses([]);
            }
        };
        fetchClasses();
    }, []);

    // When in edit mode, populate the form with the existing trainer details
    useEffect(() => {
        const fetchTrainersDetails = async () => {
            if (isEditMode && trainerDetails) {
                try {
                    // Retrieve the idToken from localStorage
                    const idToken = localStorage.getItem('idToken');

                    // Send GET request to fetch trainer details
                    const response = await axios.get(`http://localhost:5000/trainers/${trainerDetails}`, {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    });

                    const trainerData = response.data;

                    // Populate form fields
                    setName(trainerData.name || '');
                    setSpecialty(trainerData.specialty || '');
                    setSelectedClass(trainerData.assignedClasses ? trainerData.assignedClasses[0] : ''); // Assuming a single class
                    setContactInfo(trainerData.contactInfo || '');
                } catch (error) {
                    console.error('Error fetching trainer details:', error);
                }
            }
        };

        fetchTrainersDetails();
    }, [isEditMode, trainerDetails]);

    // Validate and create/update trainer
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !contactInfo || !selectedClass) {
            setError('Name, Contact Info, and Class are required!');
            return;
        }

        try {
            const trainerData = {
                name,
                specialty,
                assignedClasses: [selectedClass], // Wrap in array to maintain compatibility
                contactInfo,
            };

            // Retrieve the idToken from localStorage
            const idToken = localStorage.getItem('idToken');

            if (isEditMode && trainerDetails) {
                // Update trainer (PUT)
                await axios.put(`http://localhost:5000/trainers/${trainerDetails}`, trainerData, {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                });
                setSuccess('Trainer updated successfully!');
            } else {
                // Create new trainer (POST)
                await axios.post('http://localhost:5000/trainers', trainerData, {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                });
                setSuccess('Trainer created successfully!');
            }

            // Reset form state
            setError('');
            setName('');
            setSpecialty('');
            setSelectedClass('');
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
                        <label className="block text-gray-700">Specialty</label>
                        <input
                            type="text"
                            placeholder="Specialty"
                            value={specialty || ''}
                            onChange={(e) => setSpecialty(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Membership Plan</label>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                            required
                        >
                            <option value="">Select a Class</option>
                            {availableClasses.map((cls) => (
                                <option key={cls.id} value={cls.name}>
                                    {cls.name} - ${cls.price}
                                </option>
                            ))}
                        </select>
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