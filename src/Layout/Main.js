import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CgHomeAlt } from 'react-icons/cg';
import { FaGraduationCap } from "react-icons/fa";
import { MdOutlineLiveHelp } from "react-icons/md";
const Main = () => {
    return (
        <section className="max-w-[1440px] mx-auto">
            <div className="navbar border-2">
                <div className="navbar-start">
                    <div className="dropdown">
                    </div>
                    <label htmlFor="my-drawer-2" className="btn lg:hidden"> <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg></label>
                    <Link className="btn btn-ghost text-xl">Quick Edu Live</Link>
                </div>

                <div className="navbar-end gap-2">
                    <p className="font-semibold">Welcome, Newman</p>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 ring ring-neutral ring-offset-base-100 ring-offset-2 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-1">
                            <li>
                                <Link className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link className="justify-between">
                                    Whats New
                                    <span className="badge">Version 0.1</span>
                                </Link>
                            </li>
                            <li><Link>Report a Problem</Link></li>
                            <li><Link className="bg-error">Logout</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <Outlet></Outlet>
                        <Toaster></Toaster>

                    </div>
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
                </div>
            </div>
        </section>
    );
};

export default Main;