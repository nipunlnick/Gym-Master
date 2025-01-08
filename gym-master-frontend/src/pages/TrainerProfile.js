import React, { useEffect, useState } from 'react';
import { useDate } from '../context/DateContext';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const ClientProfile = () => {
    const { trainerId } = useParams();
    const currentDate = useDate();
    const [trainer, setTrainer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch trainer data when component mounts or trainerId changes
    useEffect(() => {
        const fetchTrainer = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/trainers/${trainerId}`);
                if (response.status === 200) {
                    setTrainer(response.data);
                } else {
                    throw new Error('Trainer not found');
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchTrainer();
    }, [trainerId]);

    // If data is loading or there is an error, show appropriate messages
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!trainer) return <div>No trainer data available</div>;

    const { name, specialty, assignedClasses, contactInfo } = trainer;

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
                <div className="flex-col justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Trainer</h1>
                    <p className="text-sm text-gray-500">{currentDate}</p>
                </div>
                <div className="w-full h-full flex flex-grow-0 justify-center space-y-2 mt-52">
                    <div className="flex-col w-full items-left justify-left">
                        <p className="text-xl text-gray-500">{specialty}</p>
                        <h2 className="text-8xl font-bold text-gray-800">{name}</h2>
                        <p className="text-xl text-gray-500">{contactInfo}</p>
                    </div>
                    <div className="mt-10">
                        {Array.isArray(assignedClasses) && assignedClasses.length > 0 ? (
                            <ul className="mt-4 space-y-2">
                                {assignedClasses.map((classItem) => (
                                    <li key={classItem.id} className="p-4 bg-gray-100 rounded shadow-sm">
                                        <p className="text-lg font-bold">{classItem.name}</p>
                                        <p className="text-sm text-gray-600">{classItem.day} | {classItem.startTime} - {classItem.endTime}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 mt-4">No assigned classes available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientProfile;