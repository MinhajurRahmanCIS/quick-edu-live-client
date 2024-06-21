import React, { useContext } from 'react';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import { AuthContext } from '../../../../contexts/AuthProvider';
import Loading from '../../../Shared/Loading/Loading';
import ClassEnrollCard from './ClassEnrollCard';

const ClassEnroll = ({setModal, enrollClasses, enrollLoading, refetch}) => {
    const { user } = useContext(AuthContext);
    if(enrollLoading){
        return <Loading></Loading>
    };
    return (
        <div className="card-body grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-1 gap-3 gap-y-10">
            <label htmlFor="enroll-modal" className="card justify-center items-center bg-base-100 hover:bg-base-300 border cursor-pointer" onClick={() => setModal(user?.email)}>
                <MdOutlineAddToPhotos className="text-9xl"></MdOutlineAddToPhotos>
            </label >
            {
                enrollClasses &&
                enrollClasses?.map(c =>
                    <ClassEnrollCard
                        key={c._id}
                        c={c}
                        refetch={refetch}
                    >
                    </ClassEnrollCard>)
            }
        </div>
    );
};

export default ClassEnroll;