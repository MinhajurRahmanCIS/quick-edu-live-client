import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../../Pages/Shared/Loading/Loading';
import useTeacher from '../../hooks/useTeacher';

const TeacherRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isTeacher, isTeacherLoading] = useTeacher(user?.email);
    const location = useLocation();

    if (loading || isTeacherLoading) {
        return <Loading></Loading>
    }

    if (user && isTeacher) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default TeacherRoute;