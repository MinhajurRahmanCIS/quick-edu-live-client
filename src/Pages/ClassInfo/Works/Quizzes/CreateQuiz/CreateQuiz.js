import React from 'react';
import { MdOutlineAddToPhotos } from 'react-icons/md';

const CreateQuiz = ({id}) => {
    return (
        <div>
            <label htmlFor="quiz-modal" className="card justify-center items-center bg-base-100 hover:bg-base-300 border cursor-pointer">
                <MdOutlineAddToPhotos className="text-9xl"></MdOutlineAddToPhotos> Create Quiz
                {/* <span className="text-md font-bold">Create Class</span> */}
            </label >
        </div>
    );
};

export default CreateQuiz;