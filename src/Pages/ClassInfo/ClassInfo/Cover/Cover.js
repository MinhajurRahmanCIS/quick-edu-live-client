import React from 'react';

const Cover = ({ classData }) => {
    const {name, photoURL} = classData;
    return (
        <div className="relative hover:opacity-95">
            <img className="w-full h-[300px]" src={photoURL} alt="" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                <span className="text-white text-3xl font-bold">{name}</span>
            </div>
        </div>

    );
};

export default Cover;