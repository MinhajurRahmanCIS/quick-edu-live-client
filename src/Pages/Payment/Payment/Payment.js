import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();

    // Redirect to "/myhome" route when the component mounts
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/myhome");
        }, 2000); // Delay of 3000 milliseconds (3 seconds)

        // Clean up the timeout to prevent memory leaks
        return () => clearTimeout(timeout);
    }, [navigate]);
    
    return (
        <div className="flex flex-col justify-center items-center p-48">
        <span className="text-xl">Thanks For Purchasing. Loading....</span>
    </div>
    );
};

export default Payment;