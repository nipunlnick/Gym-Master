import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/logo.png';

const Welcome = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center transform transition-all hover:scale-105">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Gym Master</h1>
                <p className="text-gray-500 mb-6">Your ultimate fitness partner</p>

                <div className="space-y-4">
                    <Link to="/auth/login">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg w-8/12 mb-4 hover:bg-blue-700 transition duration-300 shadow-lg">
                            Login
                        </button>
                    </Link>
                    <Link to="/auth/signup">
                        <button className="bg-green-500 text-white px-6 py-3 rounded-lg w-8/12 hover:bg-green-600 transition duration-300 shadow-lg">
                            Signup
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
