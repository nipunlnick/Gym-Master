import React from 'react';
import Sidebar from '../components/Sidebar';
import DetailsCard from '../components/DetailsCard';

const trainers = [
    { name: "John Doe", specialty: "BOX FIT", email: "jhondoe@example.com" },
    { name: "Jane Doe", specialty: "Yoga", email: "janedoe@example.com" },
    // Add more trainers as needed
];

const Trainers = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Trainers</h1>
                    <p className="text-lg text-gray-400">Total Trainers: {trainers.length}</p>
                </header>
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <input
                        type="text"
                        className="p-2 w-full border border-gray-300 rounded-lg"
                        placeholder="Search..."
                    />
                </div>
                <div>
                    {trainers.map((trainer, index) => (
                        <DetailsCard
                            key={index}
                            name={trainer.name}
                            specialty={trainer.specialty}
                            email={trainer.email}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Trainers;
