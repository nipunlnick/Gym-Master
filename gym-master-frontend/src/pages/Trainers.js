import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import CreateTrainer from '../components/CreateTrainer';
import TrainerCard from '../components/TrainerCard';
import axios from 'axios';

const Trainers = () => {
    const [trainers, setTrainers] = useState([]);
    const [showCreateTrainerForm, setShowCreateTrainerForm] = useState(false);
    const [editTrainerDetails, setEditTrainerDetails] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch trainers from Firestore
    const fetchTrainers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/trainers`);
            setTrainers(response.data);
        } catch (error) {
            console.error('Error fetching trainers:', error);
        }
    };

    // Handle toggling the Create Trainer form
    const toggleCreateTrainerForm = () => {
        setShowCreateTrainerForm(!showCreateTrainerForm);
        setEditTrainerDetails(null);
    };

    // Handle trainer edit
    const handleEdit = (trainer) => {
        setEditTrainerDetails(trainer); // Set trainer details to edit
        setShowCreateTrainerForm(true); // Open form in edit mode
    };

    // Handle trainer delete
    const handleDelete = async (id) => {
        try {
            // Retrieve the idToken from localStorage
            const idToken = localStorage.getItem('idToken');

            await axios.delete(`http://localhost:5000/trainers/${id}`, {
                headers: { Authorization: `Bearer ${idToken}` }
            });
            setTrainers(trainers.filter(trainer => trainer.id !== id));
        } catch (error) {
            console.error('Error deleting trainer:', error);
        }
    };

    // Filter trainers based on search term
    const filteredTrainers = trainers.filter(trainer =>
        trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchTrainers();
    });

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Trainers</h1>
                    <p className="text-lg text-gray-400">Total Trainers: {trainers.length}</p>
                </header>
                <div className="bg-gray-100 p-4 flex items-center border-spacing-1 rounded-lg mb-6">
                    <input
                        type="text"
                        className="p-2 w-full border mr-5 border-gray-300 rounded-lg"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={toggleCreateTrainerForm}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                    >
                        {showCreateTrainerForm ? 'Cancel' : 'Create New Trainer'}
                    </button>
                </div>
                {showCreateTrainerForm && <CreateTrainer
                    onCreate={fetchTrainers}
                    onClose={toggleCreateTrainerForm}
                    isEditMode={editTrainerDetails ? true : false}
                    trainerDetails={editTrainerDetails}
                />}
                <div>
                    {filteredTrainers.length > 0 ? (
                        filteredTrainers.map(trainer => (
                            <TrainerCard
                                key={trainer.id}
                                trainerId={trainer.id}
                                name={trainer.name}
                                specialty={trainer.specialty}
                                assignedClasses={trainer.assignedClasses}
                                contactInfo={trainer.contactInfo}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <div>No trainers available</div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Trainers;
