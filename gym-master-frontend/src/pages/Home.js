import React, { useState, useEffect } from 'react';
import { useDate } from '../context/DateContext';
import GymButton from '../components/GymButton';
import Card from '../components/Card';
import Sidebar from '../components/Sidebar';
import CreatePackage from '../components/CreatePackage';
import CreateTrainer from '../components/CreateTrainer';
import CreateClient from '../components/CreateClient';
import CreateClass from '../components/CreateClass';
import axios from 'axios';

const Home = () => {
    const currentDate = useDate();
    const [stats, setStats] = useState({
        membersCount: 0,
        trainersCount: 0,
        classesCount: 0,
        revenue: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(null);

    // Fetch stats from backend
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const idToken = localStorage.getItem('idToken'); // Retrieve the token
                const response = await axios.get('http://localhost:5000/stats', {
                    headers: { Authorization: `Bearer ${idToken}` },
                });
                setStats(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response ? err.response.data : 'Failed to fetch stats');
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Function to handle opening different forms
    const handleOpenForm = (formType) => {
        setShowForm(showForm === formType ? null : formType); // Toggle form
    };

    // Function to close the form
    const handleCloseForm = () => setShowForm(null);

    // Helper to handle loading states for card values
    const getCardValue = (value) => (loading ? '...' : value);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Home</h1>
                            <p className="text-gray-500">{currentDate}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500">Last Month</p>
                            <h2 className="text-green-600 text-3xl font-bold">
                                {loading ? 'Loading...' : `${stats.revenue.toLocaleString()} LKR`}
                            </h2>
                        </div>
                    </div>

                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div className="grid grid-cols-3 gap-8 mb-8">
                            <Card title="Total Members" value={getCardValue(stats.membersCount)} />
                            <Card title="Total Trainers" value={getCardValue(stats.trainersCount)} />
                            <Card title="Active Classes" value={getCardValue(stats.classesCount)} />
                        </div>
                    )}

                    <div className="bg-indigo-900 text-white text-center py-8 rounded-lg">
                        <h2 className="text-5xl font-bold">GYM MASTER</h2>
                    </div>

                    {/* Buttons to add various entities */}
                    <div className="flex justify-center space-x-4 mt-8">
                        {['package', 'class', 'trainer', 'client'].map((formType) => (
                            <GymButton
                                key={formType}
                                onClick={() => handleOpenForm(formType)}
                            >
                                {showForm === formType ? 'Cancel' : `Add ${formType.charAt(0).toUpperCase() + formType.slice(1)}`}
                            </GymButton>
                        ))}
                    </div>

                    {/* Conditionally render the forms */}
                    {showForm && React.createElement(
                        {
                            package: CreatePackage,
                            class: CreateClass,
                            trainer: CreateTrainer,
                            client: CreateClient,
                        }[showForm],
                        { onClose: handleCloseForm, onCreate: () => console.log(`${showForm.charAt(0).toUpperCase() + showForm.slice(1)} Created`) }
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
