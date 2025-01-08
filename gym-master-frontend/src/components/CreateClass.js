import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateClass = ({ classDetails, isEditMode, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [day, setDay] = useState('Monday');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [trainers, setTrainers] = useState([]); // Initialize as an empty array
    const [selectedTrainer, setSelectedTrainer] = useState(''); // Store the selected trainer
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch trainers from the backend on component mount
    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/trainers');
                setTrainers(response.data);
            } catch (error) {
                console.error('Error fetching trainers:', error);
            }
        };
        fetchTrainers();
    }, []);

    // When in edit mode, populate the form with the existing class details
    useEffect(() => {
        const fetchClassDetails = async () => {
            if (isEditMode && classDetails) {
                try {
                    const idToken = localStorage.getItem('idToken');
                    const response = await axios.get(`http://localhost:5000/classes/${classDetails}`, {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    });
                    const newClassData = response.data;

                    setName(newClassData.name || '');
                    setDay(newClassData.day || 'Monday');
                    setStartTime(newClassData.startTime || '');
                    setEndTime(newClassData.endTime || '');
                    setSelectedTrainer(newClassData.trainer || '');
                } catch (error) {
                    console.error('Error fetching class:', error);
                }
            }
        };

        fetchClassDetails();
    }, [isEditMode, classDetails]);

    // Validate and create or update class
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !day || !startTime || !endTime) {
            setError('Name, Day, Start Time, End Time, and Trainer are required!');
            return;
        }

        try {
            const classData = {
                name,
                day,
                startTime,
                endTime,
                trainer: selectedTrainer,
            };

            const idToken = localStorage.getItem('idToken');

            if (isEditMode && classDetails) {
                await axios.put(`http://localhost:5000/classes/${classDetails}`, classData, {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                });
                setSuccess('Class updated successfully!');
            } else {
                await axios.post('http://localhost:5000/classes', classData, {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                });
                setSuccess('Class created successfully!');
            }

            // Reset form state
            setError('');
            setName('');
            setDay('Monday');
            setStartTime('');
            setEndTime('');
            setSelectedTrainer('');
            onCreate();
            onClose();
        } catch (error) {
            setError('Error creating/updating class: ' + error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">{isEditMode ? 'Edit Class' : 'Create Class'}</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Class Name</label>
                        <input
                            type="text"
                            placeholder="Class Name"
                            value={name || ''}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Day</label>
                        <select
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2">
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Start Time</label>
                        <input
                            type="time"
                            value={startTime || ''}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">End Time</label>
                        <input
                            type="time"
                            value={endTime || ''}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Trainer</label>
                        <select
                            value={selectedTrainer || ''}
                            onChange={(e) => setSelectedTrainer(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2">
                            {trainers.length > 0 ? (
                                trainers.map((trainer) => (
                                    <option key={trainer.id} value={trainer.name}>
                                        {trainer.name} - {trainer.speciality}
                                    </option>
                                ))
                            ) : (
                                <option value="">No Trainers Available</option>
                            )}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                        {isEditMode ? 'Update Class' : 'Create Class'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateClass;
