import React from 'react';
// import createClass from '../../../assets/video/Create_Class.mp4';
import { Link } from 'react-router-dom';
const CreateClassInfo = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-10 items-center">
                <div>
                    <h1 className="sm:text-2xl md:text-xl lg:text-2xl xl:text-5xl font-bold">Transform Your Learning Experience</h1>
                    <p className="md:text-xs lg:text-sm xl:text-xl mt-4 text-justify">
                    Quick Edu Live is not just another classroom platform. it's a revolutionary AI-powered learning environment that brings teachers and students together in a dynamic, interactive space. Whether you're a teacher looking to create engaging classes or a student eager to participate in live sessions, Quick Edu Live has everything you need to succeed.
                    </p>
                    <Link to="/signup" className="btn btn-neutral w-full sm:w-2/6 mt-2">Join Us Today</Link>
                </div>
                {/* <div className="flex justify-center">
                    <video className="lg:w-full xl:w-4/5  and" height="auto" autoPlay muted loop>
                        <source src={createClass} type="video/mp4" />
                        Your browser does not support the video. Please Use Another One.
                    </video>
                </div> */}
            </div>
        </div>
    );
};

export default CreateClassInfo;