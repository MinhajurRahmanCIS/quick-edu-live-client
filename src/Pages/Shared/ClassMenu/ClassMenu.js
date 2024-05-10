import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { SiGooglebard } from "react-icons/si";


const ClassMenu = () => {
    const { id } = useParams();
    const menu =
        <>
            <Link to={`/myhome/classinfo/${id}`} className="btn btn-ghost rounded-btn">Home</Link>
            <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">Classwork <IoIosArrowDown></IoIosArrowDown></div>
                <ul tabIndex={0} className="menu dropdown-content z-[1] shadow bg-base-100 border rounded-box mt-4 gap-0.5">
                    <li className="border rounded-lg"><Link to={`/myhome/classinfo/quizzes/${id}`}>Quiz</Link></li>
                    <li className="border rounded-lg"><Link to={`/myhome/classinfo/assignments/${id}`}>Assignment</Link></li>
                </ul>
            </div>
            <Link to={`/myhome/classinfo/classpeople/${id}`} className="btn btn-ghost rounded-btn">People</Link>
            {/* <Link to={`/myhome/classinfo/chat/${id}`} className="btn btn-ghost rounded-btn">Chat</Link> */}
        </>;
    return (
        <div className="navbar bg-base-300 my-3">
            <div className="hidden md:flex items-center gap-1 text-md md:text-xl">
                <SiGooglebard className="text-sky-600"></SiGooglebard>
                <p className="font-bold"><span className="text-slate-950">Ai</span> <span className="text-cyan-700">Classroom</span></p>
            </div>
            <div className="hidden md:flex flex-1 px-2">
                {menu}
            </div>
            <div className="grid grid-col-1 justify-center items-center md:hidden w-full border bg-base-200 rounded-md p-1 gap-0.5">
                {menu}
            </div>
        </div>
    );
};

export default ClassMenu;