import React from 'react';
import GymButton from '../components/GymButton';
import Card from '../components/Card';
import Sidebar from '../components/Sidebar';

const AdminHome = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Home</h1>
                            <p className="text-gray-500">Jan 03, 2025</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500">Last Month</p>
                            <h2 className="text-green-600 text-3xl font-bold">218,740.00 LKR</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8 mb-8">
                        <Card title="Total Members" value="012" />
                        <Card title="Total Trainers" value="564" />
                        <Card title="Active Classes" value="021" />
                    </div>

                    <div className="bg-indigo-900 text-white text-center py-8 rounded-lg">
                        <h2 className="text-5xl font-bold">MINATOR</h2>
                    </div>

                    <div className="flex justify-end space-x-4 mt-8">
                        <GymButton>Add Plans</GymButton>
                        <GymButton>Add Classes</GymButton>
                        <GymButton>Add Trainers</GymButton>
                        <GymButton>Add Members</GymButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
