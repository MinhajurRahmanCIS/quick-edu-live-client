import React from 'react';
import { Link } from 'react-router-dom';

const PlanCards = ({ plan }) => {
    const { title, price, features } = plan;
    return (
        <div className="rounded-lg shadow-lg bg-white p-10 m-4">
            <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
            <div className="text-center text-3xl font-extrabold mb-6">{price ? "$" + price : "Free"}</div>
            <ul className="mb-6">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-center mb-2">
                        <span className={feature.available ? 'text-green-500' : 'text-red-500'}>
                            {feature.available ? '✔' : '✖'}
                        </span>
                        <span className="ml-2">{feature.name}</span>
                    </li>
                ))}
            </ul>
            {price ? <Link to="/signup" className="btn btn-neutral w-full">Buy Now</Link> : <Link to="/signup" className="btn btn-neutral  w-full">Sing Up</Link>}
        </div>
    );
};

export default PlanCards;