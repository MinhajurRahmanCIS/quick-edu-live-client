import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Cover from '../Cover/Cover';
import useClass from '../../../../hooks/useClass';
import Loading from '../../../Shared/Loading/Loading';
import Announcement from '../Announcement/Announcement';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { Helmet } from 'react-helmet-async';
const ClassInfo = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const { classData, isLoading } = useClass(id);
    if (isLoading) {
        return <Loading></Loading>
    };

    return (
        <div>
            <Helmet>
                <title>
                    {classData?.data?.name} Class
                </title>
            </Helmet>
            <Cover classData={classData.data}></Cover>
            <Announcement
            classData={classData.data} 
            user={user}
            ></Announcement>
        </div>
    );
};

export default ClassInfo;