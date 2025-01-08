// src/context/DateContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a Context for the Date
const DateContext = createContext();

// DateProvider component to provide the current date
export const DateProvider = ({ children }) => {
    const [date] = useState(new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    }));

    return (
        <DateContext.Provider value={date}>
            {children}
        </DateContext.Provider>
    );
};

// Custom hook to use the date
export const useDate = () => useContext(DateContext);
