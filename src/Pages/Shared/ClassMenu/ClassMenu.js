import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";



const ClassMenu = () => {
    const { id } = useParams();
    return (
        <div className="navbar bg-base-300 my-3">
            <div className="flex ">
                <p className="font-bold">Classroom</p>
            </div>
            <div className="flex flex-1 px-2">
                <div className="flex items-stretch">
                    <Link to={`/myhome/classinfo/${id}`} className="btn btn-ghost rounded-btn">Home</Link>
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">Class Work <IoIosArrowDown></IoIosArrowDown></div>
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