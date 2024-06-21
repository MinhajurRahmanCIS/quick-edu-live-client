import React from 'react';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import Loading from '../../../../Shared/Loading/Loading';
import useClass from '../../../../../hooks/useClass';

const CreateQuiz = ({id, setModal}) => {
    const {classData, isLoading} = useClass(id);
    if(isLoading){
        return <Loading></Loading>
    };
    return (
        <div>
            <label onClick={()=>setModal(classData.data)} htmlFor="quiz-modal" className="card justify-center items-center bg-base-100 hover:bg-base-300 border cursor-pointer h-full">
                <MdOutlineAddToPhotos className="text-9xl"></MdOutlineAddToPhotos> Create Quiz
            </label >
        </div>
    );
};

export default CreateQuiz;