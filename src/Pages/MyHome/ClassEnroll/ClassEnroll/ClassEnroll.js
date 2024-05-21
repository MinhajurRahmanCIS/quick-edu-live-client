import React, { useContext } from 'react';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import { AuthContext } from '../../../../contexts/AuthProvider';

const ClassEnroll = ({setModal}) => {
    const { user } = useContext(AuthContext);
    return (
        <div className="card-body grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-1 gap-3 gap-y-10">
            <label htmlFor="enroll-modal" className="card justify-center items-center bg-base-100 hover:bg-base-300 border cursor-pointer" onClick={() => setModal(user?.email)}>
                <MdOutlineAddToPhotos className="text-9xl"></MdOutlineAddToPhotos>
                {/* <span className="text-md font-bold">Create Class</span> */}
            </label >
        </div>
    );
};

export default ClassEnroll;