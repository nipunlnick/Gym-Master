import React from 'react';

const SidebarIcon = ({ icon, alt }) => {
    return (
        <li className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-200 cursor-pointer">
            <img src={icon} alt={alt} />
        </li>
    );
};

export default SidebarIcon;
