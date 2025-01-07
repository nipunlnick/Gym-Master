import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import PackageCard from '../components/PackageCard';
import CreatePackage from '../components/CreatePackage';
import axios from 'axios';

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showCreatePackageForm, setShowCreatePackageForm] = useState(false);
    const [editPackageDetails, setEditPackageDetails] = useState(null);

    // Fetch packages from Firestore
    const fetchPackages = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/packages?page=${page}`);
            setPackages(response.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
        setLoading(false);
    };

    // Handle toggling the Create Package form
    const toggleCreatePackageForm = () => {
        setShowCreatePackageForm(!showCreatePackageForm);
        setEditPackageDetails(null);
    };

    // Handle package edit
    const handleEdit = (pkg) => {
        setEditPackageDetails(pkg); // Set package details to edit
        setShowCreatePackageForm(true); // Open form in edit mode
    };

    // Handle package delete
    const handleDelete = async (id) => {
        try {
            // Retrieve the idToken from localStorage
            const idToken = localStorage.getItem('idToken');

            await axios.delete(`http://localhost:5000/packages/${id}`, {
                headers: { Authorization: `Bearer ${idToken}` }
            });
            setPackages(packages.filter(pkg => pkg.id !== id));
        } catch (error) {
            console.error('Error deleting package:', error);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, [page]);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Packages</h1>
                        <p className="text-gray-500">Jan 03, 2025</p>
                    </div>
                    <div className="text-right">
                        <button
                            onClick={toggleCreatePackageForm}
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            {showCreatePackageForm ? 'Cancel' : 'Create New Package'}
                        </button>
                    </div>
                </div>
                {showCreatePackageForm && <CreatePackage
                    onCreate={fetchPackages}
                    onClose={toggleCreatePackageForm}
                    isEditMode={editPackageDetails ? true : false}
                    packageDetails={editPackageDetails}
                />}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {loading ? (
                        <div className="col-span-3 text-center">Loading...</div>
                    ) : (
                        packages.map(pkg => (
                            <PackageCard
                                key={pkg.id}
                                packageId={pkg.id}
                                name={pkg.name}
                                price={pkg.price}
                                duration={pkg.duration}
                                description={pkg.description}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => setPage(page - 1)}
                        className={`px-4 py-2 ${page === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage(page + 1)}
                        className="px-4 py-2 bg-blue-500 text-white"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Packages;
