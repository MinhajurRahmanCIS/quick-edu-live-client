import React from 'react';
import useClass from '../../../../../hooks/useClass';
import Loading from '../../../../Shared/Loading/Loading';
import { MdOutlineAddToPhotos } from 'react-icons/md';

const CreateAssignment = ({ id, setModal }) => {
    const { classData, isLoading } = useClass(id);
    if (isLoading) {
        return <Loading></Loading>
    };
    // console.log(classData)
    return (
        <div>
        <label onClick={()=>setModal(classData.data)} htmlFor="assignment-modal" className="card justify-center items-center bg-base-100 hover:bg-base-300 border cursor-pointer h-full">
            <MdOutlineAddToPhotos className="text-9xl"></MdOutlineAddToPhotos> Create Assignment
        </label >
    </div>
    );
};

export default CreateAssignment;