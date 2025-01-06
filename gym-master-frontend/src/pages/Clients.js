import React from 'react';
import Sidebar from '../components/Sidebar';
import DetailsCard from '../components/DetailsCard';

const clients = [
    { name: "John Doe", package: "Gold", email: "jhondoe@example.com" },
    { name: "Jane Doe", package: "Platinum", email: "janedoe@example.com" },
];

const Clients = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Members</h1>
                    <p className="text-lg text-gray-400">Total Members: {clients.length}</p>
                </header>
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <input
                        type="text"
                        className="p-2 w-full border border-gray-300 rounded-lg"
                        placeholder="Search..."
                    />
                </div>
                <div>
                    {clients.map((client, index) => (
                        <DetailsCard
                            key={index}
                            name={client.name}
                            specialty={client.package}
                            email={client.email}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Clients;
