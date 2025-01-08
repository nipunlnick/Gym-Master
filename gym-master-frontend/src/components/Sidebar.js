// Sidebar.js
import React from 'react';
import { FaTachometerAlt, FaUsers, FaBox, FaChalkboardTeacher, FaSignOutAlt, FaUser } from 'react-icons/fa';  // Import relevant icons
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

const Sidebar = () => {
    const navigate = useNavigate();  // For navigation after logout

    // Function to handle logout
    const handleLogout = () => {
        // Redirect to the Welcome page
        navigate('/');
    };

    return (
        <div className="h-screen w-20 bg-gray-100 flex flex-col items-center py-6 space-y-20">
            <img src="./assets/logo.png" alt="Logo" className="w-10 h-10 mb-10 " />
            <ul className="space-y-2 mb-max">
                {/* Dashboard Link */}
                <li>
                    <div className="items-center justify-center flex w-10 h-10 rounded-full bg-gray-300">
                        <Link to="/home" className="text-gray-700 hover:text-blue-500">
                            <FaTachometerAlt size={24} />
                        </Link>
                    </div>
                </li>
                {/* Trainers Link */}
                <li>
                    <div className="items-center justify-center flex w-10 h-10 rounded-full bg-gray-300">
                        <Link to="/trainers" className="text-gray-700 hover:text-blue-500">
                            <FaChalkboardTeacher size={24} />
                        </Link>
                    </div>
                </li>
                {/* Packages Link */}
                <li>
                    <div className="items-center justify-center flex w-10 h-10 rounded-full bg-gray-300">
                        <Link to="/packages" className="text-gray-700 hover:text-blue-500">
                            <FaBox size={24} />
                        </Link>
                    </div>
                </li>
                {/* Clients Link */}
                <li>
                    <div className="items-center justify-center flex w-10 h-10 rounded-full bg-gray-300">
                        <Link to="/clients" className="text-gray-700 hover:text-blue-500">
                            <FaUsers size={24} />
                        </Link>
                    </div>
                </li>
            </ul>

            {/* Bottom Section with User Icon and Logout Button */}
            <div className="mt-max p-4 flex flex-col align-baseline w-full items-center text-center absolute bottom-0">
                <div className="mb-4 items-center justify-center flex w-10 h-10 rounded-full bg-gray-300">
                    {/* User Icon */}
                    <FaUser size={24} className="text-gray-700" />
                </div>
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-500 p-2 rounded-full"
                >
                    <FaSignOutAlt size={24} />
                </button>
            </div>
        </div >
    );
};

export default Sidebar;
