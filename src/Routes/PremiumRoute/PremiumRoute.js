import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../../Pages/Shared/Loading/Loading';
import usePremium from '../../hooks/UsePremium';

const PremiumRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isPremium, isPremiumLoading] = usePremium(user?.email);
    const location = useLocation();

    if (loading || isPremiumLoading) {
        return <Loading></Loading>;
    };

    if (user && isPremium) {
        return children;
    };

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PremiumRoute;