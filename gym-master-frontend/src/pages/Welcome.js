import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/logo.png';

const Welcome = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <img
                    src="../assets/logo.png"
                    alt="Gym Logo"
                    className="mx-auto mb-6 w-24 h-24"
                />
                <h1 className="text-3xl font-bold mb-6">Welcome to Gym Management System</h1>
                <div className="space-y-4">
                    <Link to="/auth/login">
                        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200">
                            Login
                        </button>
                    </Link>
                    <Link to="/auth/signup">
                        <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-200">
                            Signup
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;