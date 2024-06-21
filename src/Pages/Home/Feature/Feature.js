import React from 'react';
import { MdOutlineAssignment, MdOutlineQuiz } from 'react-icons/md';
import { SiGooglebard, SiGoogleclassroom } from 'react-icons/si';
const Feature = () => {
    return (
        <div className="bg-base-200 p-10 mt-10">
            <h1 className="text-5xl font-semibold text-center mb-5">Feature</h1> 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
            <div className="card bg-base-100 shadow-xl border">
                <div className="card-body flex flex-col items-center justify-center">
                    <h2 className="text-5xl flex gap-2"> <SiGooglebard className="text-xs text-blue-400" /> <SiGoogleclassroom /></h2>
                    <p className="text-lg font-semibold">Ai Classroom</p>
                </div>
            </div>
            <div className="card bg-base-100 shadow-xl border">
                <div className="card-body flex flex-col items-center justify-center">
                    <h2 className="text-5xl flex"><SiGooglebard className="text-xs text-blue-400" /> <MdOutlineQuiz /></h2>
                    <p className="text-lg font-semibold">Ai Quiz Generator</p>
                </div>
            </div>
            <div className="card bg-base-100 shadow-xl border">
                <div className="card-body flex flex-col items-center justify-center">
                    <h2 className="text-5xl flex"><SiGooglebard className="text-xs text-blue-400" /> <MdOutlineAssignment /> </h2>
                    <p className="text-lg font-semibold">Ai Assignment Generator</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Feature;