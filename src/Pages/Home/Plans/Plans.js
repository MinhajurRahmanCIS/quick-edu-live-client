import React from 'react';
import PlanCards from './PlanCards';

const Plans = () => {
    const plans = [
        {
            id: 1,
            title: 'Basic',
            features: [
                { name: 'Ai Classroom', available: true },
                { name: 'Ai Quiz Generator', available: true },
                { name: 'Ai Assignment Generator', available: true },
                { name: 'Ai Paper Checker', available: false }
            ],
        },
        {
            id: 2,
            title: 'Premium',
            price: 10.99,
            features: [
                { name: 'Ai Classroom', available: true },
                { name: 'Ai Quiz Generator', available: true },
                { name: 'Ai Assignment Generator', available: true },
                { name: 'Ai Paper Checker', available: true }
            ],
        },
    ];
    return (
        <div className="bg-base-200 p-20">
             <h1 className="text-5xl font-semibold text-center mb-5 ">Plans</h1> 
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center">
                {plans.map((plan, index) => (
                    <PlanCards
                        key={plan.id}
                        plan={plan}
                    >
                    </PlanCards>
                ))}
            </div>
        </div>
    );
};

export default Plans;