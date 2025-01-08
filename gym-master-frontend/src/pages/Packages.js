import React, { useState, useEffect } from 'react';
import { useDate } from '../context/DateContext';

import Sidebar from '../components/Sidebar';
import CreatePackage from '../components/CreatePackage';
import PackageCard from '../components/PackageCard';
import CreateClass from '../components/CreateClass';
import ClassCard from '../components/ClassCard';
import axios from 'axios';

const Packages = () => {
    const currentDate = useDate();
    const [loading, setLoading] = useState(false);

    const [packages, setPackages] = useState([]);
    const [showCreatePackageForm, setShowCreatePackageForm] = useState(false);
    const [editPackageDetails, setEditPackageDetails] = useState(null);

    const [classes, setClasses] = useState([]);
    const [showCreateClassForm, setShowCreateClassForm] = useState(false);
    const [editClassDetails, setEditClassDetails] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [page, setPage] = useState(1);
    const [totalPackages, setTotalPackages] = useState(0);

    // Fetch packages from the backend
    const fetchPackages = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/packages`, {
                params: { page, limit: 1 }
            });
            setPackages(response.data.packages);
            setTotalPackages(response.data.totalPackages);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
        setLoading(false);
    };

    // Fetch classes from the backend
    const fetchClasses = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/classes`);
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    // Handle toggling the Create Package form
    const toggleCreatePackageForm = () => {
        setShowCreatePackageForm(!showCreatePackageForm);
        setEditPackageDetails(null);
    };

    // Handle toggling the Create Class form
    const toggleCreateClassForm = () => {
        setShowCreateClassForm(!showCreateClassForm);
        setEditClassDetails(null);
    };

    // Handle package edit
    const handleEdit = (pkg) => {
        setEditPackageDetails(pkg);
        setShowCreatePackageForm(true);
    };

    // Handle class edit
    const handleEditClass = (cls) => {
        setEditClassDetails(cls);
        setShowCreateClassForm(true);
    };

    // Handle package delete
    const handleDelete = async (id) => {
        try {
            const idToken = localStorage.getItem('idToken');
            await axios.delete(`http://localhost:5000/packages/${id}`, {
                headers: { Authorization: `Bearer ${idToken}` }
            });
            fetchPackages();
        } catch (error) {
            console.error('Error deleting package:', error);
        }
    };

    // Handle class delete
    const handleDeleteClass = async (id) => {
        try {
            const idToken = localStorage.getItem('idToken');
            await axios.delete(`http://localhost:5000/classes/${id}`, {
                headers: { Authorization: `Bearer ${idToken}` }
            });
            fetchClasses();
        } catch (error) {
            console.error('Error deleting class:', error);
        }
    };

    // Function to handle pagination for packages
    const handleNextPackage = () => {
        if (page < totalPackages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPackage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    // Filter classes based on search term
    const filteredClasses = classes.filter(cls =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Call fetch functions on page load or page change
    useEffect(() => {
        fetchPackages();
        fetchClasses();
    }, [page]);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Packages</h1>
                        <p className="text-gray-500">{currentDate}</p>
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
                <div className="flex justify-center items-center space-x-4">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        Array.isArray(packages) && packages.length > 0 ? (
                            packages.map((pkg) => (
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
                        ) : (
                            <div>No packages available</div>
                        )
                    )}
                </div>

                {/* Pagination Controls for Packages */}
                <div className="flex justify-between items-center mt-8">
                    <button
                        onClick={handlePreviousPackage}
                        disabled={page === 1}
                        className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                    >
                        Previous
                    </button>
                    <span>
                        Package {page} of {totalPackages}
                    </span>
                    <button
                        onClick={handleNextPackage}
                        disabled={page === totalPackages}
                        className={`px-4 py-2 rounded ${page === totalPackages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                    >
                        Next
                    </button>
                </div>

                {/* Create Class Section */}
                <div className="bg-gray-100 p-4 flex items-center border-spacing-1 rounded-lg mt-6 mb-6">
                    <input
                        type="text"
                        className="p-2 w-full border mr-5 border-gray-300 rounded-lg"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div>
                        <button
                            onClick={toggleCreateClassForm}
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            {showCreateClassForm ? 'Cancel' : 'Create New Class'}
                        </button>
                    </div>
                </div>
                {showCreateClassForm && <CreateClass
                    onCreate={fetchClasses}
                    onClose={toggleCreateClassForm}
                    isEditMode={editClassDetails ? true : false}
                    trainerDetails={editClassDetails}
                />}
                <div className="flex justify-center items-center space-x-4 mt-8">
                    {filteredClasses.length > 0 ? (
                        filteredClasses.map((cls) => (
                            <ClassCard
                                key={cls.id}
                                classId={cls.id}
                                name={cls.name}
                                day={cls.day}
                                startTime={cls.startTime}
                                endTime={cls.endTime}
                                trainer={cls.trainer}
                                onEdit={handleEditClass}
                                onDelete={handleDeleteClass}
                            />
                        ))
                    ) : (
                        <div>No classes available</div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Packages;
