import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const menu =
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Blog</Link></li>
            <li><Link to="/">About Us</Link></li>
        </>;
    return (
        <nav className="navbar bg-base-200 py-2">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-0.5">
                        {menu}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-sm md:text-xl">Quick Edu Live</Link>
                <ul className="menu menu-horizontal px-1 hidden lg:flex font-semibold gap-0.5">
                    {menu}
                </ul>
            </div>

            {
                user?.uid
                    ?
                    <div className="navbar-end gap-2">
                        {
                            user?.uid &&
                                <Link className="btn btn-sm md:btn-md rounded-md bg-neutral-950 text-white hover:bg-neutral-400 hover:text-neutral" to="/myhome">Go To Class</Link>
                        }
                        <ProfileMenu></ProfileMenu>
                    </div>
                    :
                    <div className="navbar-end gap-2">
                        <Link to="/signup" className="btn text-white font-bold btn-neutral btn-sm md:btn-md hover:bg-slate-700">Signup</Link>
                        <Link to="/login" className="btn text-white font-bold btn-neutral btn-sm md:btn-md hover:bg-slate-700">Login</Link>
                    </div>
            }

        </nav>
    );
};

export default Navbar;