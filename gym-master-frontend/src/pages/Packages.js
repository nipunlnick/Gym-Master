import React from 'react';
import Sidebar from '../components/Sidebar';
import ClassCard from '../components/ClassCard';
import PackageCard from '../components/PackageCard';

const plans = [
    { name: "Member", price: "2000" },
    { name: "Plus", price: "2000" },
    { name: "Gold", price: "2000" },
];

const classes = [
    { name: "Beginners BOX FIT", time: "Saturday 2:00 P.M - 5:00 P.M" },
    { name: "Beginners BOX FIT", time: "Saturday 2:00 P.M - 5:00 P.M" },
    { name: "Beginners BOX FIT", time: "Saturday 2:00 P.M - 5:00 P.M" },
    { name: "Beginners BOX FIT", time: "Saturday 2:00 P.M - 5:00 P.M" },
];

const Packages = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Plans & Classes</h1>
                    <p className="text-gray-400">Jan 03, 2025</p>
                </header>
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Plans</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {plans.map((plan, index) => (
                            <PackageCard key={index} planName={plan.name} price={plan.price} />
                        ))}
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl font-bold mb-4">Classes</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {classes.map((clz, index) => (
                            <ClassCard key={index} className={clz.name} time={clz.time} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Packages;
