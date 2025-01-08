import React, { useEffect, useState } from 'react';
import { useDate } from '../context/DateContext';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const ClientProfile = () => {
    const { clientId } = useParams();
    const currentDate = useDate();
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch client data when component mounts or clientId changes
    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/clients/${clientId}`); // Assuming your API endpoint is /api/clients/:id
                if (response.status === 200) { // Check the status code
                    setClient(response.data); // Set the fetched client data
                } else {
                    throw new Error('Client not found');
                }
                setLoading(false);
            } catch (error) {
                setError(error.message); // Set error if any
                setLoading(false);
            }
        };

        fetchClient();
    }, [clientId]);

    // If data is loading or there is an error, show appropriate messages
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!client) return <div>No client data available</div>;

    const { name, membershipPlan, joinedDate, status } = client;

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Member</h1>
                        <p className="text-sm text-gray-500">{currentDate}</p>
                    </div>
                    <h1 className="text-blue-600 text-xl font-bold">{membershipPlan} Member</h1>
                </div>
                <div className="w-full h-full justify-center space-y-2 text-right mt-52">
                    <div className="flex-col items-center">
                        <p className="text-xl text-gray-500">Since {new Date(joinedDate).toLocaleDateString()}</p>
                        <h2 className="text-8xl font-bold text-gray-800">{name}</h2>
                        <p className={`text-2xl font-bold text-${status === 'Active' ? 'green' : 'red'}-600`}>{status}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientProfile;