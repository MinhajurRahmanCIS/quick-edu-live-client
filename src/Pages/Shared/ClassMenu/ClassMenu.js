import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { SiGooglebard } from "react-icons/si";


const ClassMenu = () => {
    const { id } = useParams();
    return (
        <div className="navbar bg-base-300 my-3">
            <div className="flex items-center gap-1 text-md md:text-xl">
                <SiGooglebard className="text-sky-600"></SiGooglebard>
                <p className="font-bold"><span className="text-slate-950">Ai</span> <span className="text-cyan-700">Classroom</span></p>
            </div>
            <div className="flex flex-1 px-2">
                <div className="flex items-stretch">
                    <Link to={`/myhome/classinfo/${id}`} className="btn btn-ghost rounded-btn">Home</Link>
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">Classwork <IoIosArrowDown></IoIosArrowDown></div>
                        <ul tabIndex={0} className="menu dropdown-content z-[1] shadow bg-base-100 border rounded-box mt-4 gap-0.5">
                            <li className="border rounded-lg"><Link to={`/myhome/classinfo/quizzes/${id}`}>Quiz</Link></li>
                            <li className="border rounded-lg"><Link to={`/myhome/classinfo/assignments/${id}`}>Assignment</Link></li>
                        </ul>
                    </div>
                </div>
                <Link to={`/myhome/classinfo/classpeople/${id}`} className="btn btn-ghost rounded-btn">People</Link>
            </div>
        </div>
    );
};

export default ClassMenu;