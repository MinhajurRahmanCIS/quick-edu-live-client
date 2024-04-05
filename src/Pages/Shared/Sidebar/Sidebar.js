import React from 'react';
import { Link } from 'react-router-dom';
import { CgHomeAlt } from 'react-icons/cg';
import { FaGraduationCap } from "react-icons/fa";
import { MdOutlineLiveHelp } from "react-icons/md";
const Sidebar = () => {
    return (
        <div className="drawer-side border-x-2">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu w-80 min-h-full bg-base-200 md:bg-transparent text-base-content">
                {/* Sidebar content here */}
                <li className="text-xl font-bold"><Link to="/myhome"><CgHomeAlt></CgHomeAlt> Home</Link></li>
                <ul className="menu">
                    <li>
                        <details open>
                            <summary className="text-xl font-bold"><FaGraduationCap></FaGraduationCap>Enrolled Course</summary>
                            <ul className="text-md font-semibold">
                                <li><Link>Bangla</Link></li>
                                <li><Link>Math</Link></li>
                            </ul>
                        </details>
                    </li>
                </ul>
                <li className="text-xl font-bold"><Link> <CgHomeAlt></CgHomeAlt> Home</Link></li>
                <li className="text-xl font-bold"><Link> <MdOutlineLiveHelp></MdOutlineLiveHelp> Help</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;