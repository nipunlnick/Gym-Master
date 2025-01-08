import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePackage = ({ packageDetails, isEditMode, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('Monthly');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // When in edit mode, populate the form with the existing package details
    useEffect(() => {
        const fetchPackagesDetails = async () => {
            if (isEditMode && packageDetails) {
                try {
                    // Retrieve the idToken from localStorage
                    const idToken = localStorage.getItem('idToken');

                    // Send PUT request to update package
                    const response = await axios.get(`http://localhost:5000/packages/${packageDetails}`, {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    });

                    const newPackageData = response.data;

                    // Populate the form with the package details to edit
                    setName(newPackageData.name || '');
                    setPrice(newPackageData.price || '');
                    setDuration(newPackageData.duration || 'Monthly');
                    setDescription(newPackageData.description || '');
                } catch (error) {
                    console.error('Error fetching packages:', error);
                }
            }
        };

        fetchPackagesDetails();
    }, [isEditMode, packageDetails]);

    // Validate and create new package
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price) {
            setError('Name and Price are required!');
            return;
        }

        try {
            const packageData = {
                name,
                price,
                duration,
                description,
            };

            if (isEditMode && packageDetails) {
                // Retrieve the idToken from localStorage
                const idToken = localStorage.getItem('idToken');

                // Send PUT request to update package
                await axios.put(`http://localhost:5000/packages/${packageDetails}`, packageData, {
                    headers: {
                        Authorization: `Bearer ${idToken}`, // Replace with your actual token
                    },
                });
                setSuccess('Package updated successfully!');
            } else {
                // Retrieve the idToken from localStorage
                const idToken = localStorage.getItem('idToken');

                // Send POST request to create new package
                await axios.post('http://localhost:5000/packages', packageData, {
                    headers: {
                        Authorization: `Bearer ${idToken}`, // Replace with your actual token
                    },
                });
                setSuccess('Package created successfully!');
            }

            // Reset form state
            setError('');
            setName('');
            setPrice('');
            setDuration('Monthly');
            setDescription('');
            onCreate();
            onClose();
        } catch (error) {
            setError('Error creating/updating package: ' + error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">{isEditMode ? 'Edit Package' : 'Create Package'}</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Package Name</label>
                        <input
                            type="text"
                            placeholder="Package Name"
                            value={name || ''}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            placeholder="Price"
                            value={price || ''}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Duration</label>
                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2">
                            <option value="Monthly">Monthly</option>
                            <option value="Yearly">Yearly</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            placeholder="Description"
                            value={description || ''}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                        {isEditMode ? 'Update Package' : 'Create Package'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePackage;