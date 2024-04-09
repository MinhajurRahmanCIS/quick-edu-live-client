import React from 'react';
import { useParams } from 'react-router-dom';
import Cover from '../Cover/Cover';
import useClass from '../../../../hooks/useClass';
import Loading from '../../../Shared/Loading/Loading';
const ClassInfo = () => {
    const { id } = useParams();
    const { classData, isLoading, refetch } = useClass(id);
    console.log(classData.data);
    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div>
            <Cover classData={classData.data}></Cover>
        </div>
    );
};

export default ClassInfo;