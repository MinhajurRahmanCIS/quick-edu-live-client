import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from '../Pages/Shared/Sidebar/Sidebar';
import { AuthContext } from '../contexts/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
const Main = () => {
    const { user, logOut } = useContext(AuthContext);
    const handelLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logout Successfully!")
             })
            .catch(err => console.log(err));
    }
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
                    <p className="font-semibold hidden lg:block md:block"> {user?.uid && user?.displayName}</p>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 ring ring-neutral ring-offset-base-100 ring-offset-2 rounded-full">
                                <img src={user?.uid && user?.photoURL ? user?.photoURL : "https://i.ibb.co/TbC7PBT/male-Student.png"}  alt="User Profile"/>

                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-1">
                            <li className="block md:hidden lg:hidden">
                                <Link className="justify-between">
                                <p className="font-semibold"> {user?.uid && user?.displayName}</p>
                                </Link>
                            </li>
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
                            {
                                user?.uid && <li><Link onClick={handelLogout} className="bg-error text-white border-2 border-neutral hover:bg-slate-300 hover:text-black">Logout</Link></li>
                            }
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
                    <Sidebar></Sidebar>
                </div>
            </div>
        </section>
    );
};

export default Main;