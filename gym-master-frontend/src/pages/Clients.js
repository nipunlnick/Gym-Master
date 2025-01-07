import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import CreateClient from '../components/CreateClient';
import ClientCard from '../components/ClientCard';
import axios from 'axios';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [showCreateClientForm, setShowCreateClientForm] = useState(false);
    const [editClientDetails, setEditClientDetails] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch clients from Firestore
    const fetchClients = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/clients`);
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    // Handle toggling the Create Client form
    const toggleCreateClientForm = () => {
        setShowCreateClientForm(!showCreateClientForm);
        setEditClientDetails(null);
    };

    // Handle client edit
    const handleEdit = (client) => {
        setEditClientDetails(client); // Set client details to edit
        setShowCreateClientForm(true); // Open form in edit mode
    };

    // Handle client delete
    const handleDelete = async (id) => {
        try {
            // Retrieve the idToken from localStorage
            const idToken = localStorage.getItem('idToken');

            await axios.delete(`http://localhost:5000/clients/${id}`, {
                headers: { Authorization: `Bearer ${idToken}` }
            });
            setClients(clients.filter(client => client.id !== id));
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    // Filter clients based on search term
    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchClients();
    });

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Members</h1>
                    <p className="text-lg text-gray-400">Total Members: {clients.length}</p>
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
                        onClick={toggleCreateClientForm}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                    >
                        {showCreateClientForm ? 'Cancel' : 'Create New Client'}
                    </button>
                </div>
                {showCreateClientForm && <CreateClient
                    onCreate={fetchClients}
                    onClose={toggleCreateClientForm}
                    isEditMode={editClientDetails ? true : false}
                    clientDetails={editClientDetails}
                />}
                <div>
                    {
                        filteredClients.map(client => (
                            <ClientCard
                                key={client.id}
                                clientId={client.id}
                                name={client.name}
                                membershipPlan={client.membershipPlan}
                                joinedDate={client.joinedDate}
                                status={client.status}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))
                    }
                </div>
            </div>
        </div >
    );
};

export default Clients;
