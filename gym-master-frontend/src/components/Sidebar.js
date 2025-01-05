import React from 'react';
import SidebarIcon from './SidebarIcon';

const Sidebar = () => {
    return (
        <div className="h-screen w-20 bg-gray-100 flex flex-col items-center py-6 space-y-4">
            <img src="/path/to/logo.png" alt="Logo" className="w-12 h-12 mb-10" />
            <ul className="space-y-6">
                <SidebarIcon icon="/path/to/dashboard-icon.png" alt="Dashboard" />
                <SidebarIcon icon="/path/to/other-icon.png" alt="Other Icon" />
                {/* Add more icons */}
            </ul>
            <div className="mt-auto">
                <img src="/path/to/user-photo.jpg" alt="User" className="w-12 h-12 rounded-full" />
            </div>
        </div>
    );
};

export default Sidebar;