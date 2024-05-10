import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CgHomeAlt } from 'react-icons/cg';
import { FaGraduationCap } from "react-icons/fa";
import { MdOutlineLiveHelp } from "react-icons/md";
import { GrScan } from "react-icons/gr";
import { LuFileScan } from "react-icons/lu";
import { FcDocument } from "react-icons/fc";
import { AuthContext } from '../../../contexts/AuthProvider';
import useLoadUser from '../../../hooks/useLoadUser';
import Loading from '../Loading/Loading';
const Sidebar = ({ classes }) => {
    const { user } = useContext(AuthContext);
    const { userInfo, isLoading } = useLoadUser(user);
    if (isLoading) {
        return <Loading></Loading>;
    };
    const { role, account } = userInfo.data[0];
    return (
        <div className="drawer-side border-x-2">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu sm:w-80 min-h-full bg-base-200 md:bg-transparent text-base-content gap-0.5">
                {/* Sidebar content here */}
                <li className="text-xl font-bold"><Link to="/myhome"><CgHomeAlt></CgHomeAlt> Home</Link></li>
                <ul className="menu">
                    <li>
                        <details open>
                            <summary className="text-xl font-bold"><FaGraduationCap></FaGraduationCap>
                                {
                                    role === "Teacher" ? "Teaching" : "Enrolled"
                                }
                            </summary>
                            <ul className="text-md font-semibold">
                                {
                                    classes &&
                                    classes?.map(c =>
                                        <li
                                            key={c._id}
                                            c={c}
                                            className="mt-0.5"><Link to={`/myhome/classinfo/${c._id}`}>{c.name}</Link></li>)
                                }
                            </ul>
                        </details>
                    </li>
                </ul>
                {
                    role === "Teacher" && account === "Premium" ?
                        <ul className="menu">
                            <li>
                                <details open>
                                    <summary className="text-xl font-bold"><GrScan></GrScan>Paper Checker</summary>
                                    <ul className="text-md font-semibold">
                                        <li className="text-xl font-bold"><Link to="/myhome/paperchecker"> <LuFileScan></LuFileScan>Check Paper</Link></li>
                                        <li className="text-xl font-bold mt-0.5"><Link to="/myhome/allpaper"> <FcDocument></FcDocument>All Paper</Link></li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                        :
                        <li className="text-xl font-bold"><Link><GrScan></GrScan>Ai Paper Checker</Link></li>
                }
                <li className="text-xl font-bold"><Link> <MdOutlineLiveHelp></MdOutlineLiveHelp> Help</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;