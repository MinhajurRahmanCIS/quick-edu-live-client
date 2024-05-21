import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from '../Pages/Shared/Sidebar/Sidebar';
import { Toaster } from 'react-hot-toast';
import ProfileMenu from '../Pages/Shared/ProfileMenu/ProfileMenu';
import { AuthContext } from '../contexts/AuthProvider';
import Loading from '../Pages/Shared/Loading/Loading';
import useClasses from '../hooks/useClasses';
import useEnrollClasses from '../hooks/useEnrollClasses';
const Main = () => {
    const { user } = useContext(AuthContext);
    const {classes, classLoading} = useClasses(user);
    const {enrollClasses, classLoading: enrollLoading} = useEnrollClasses(user);

    if (classLoading) {
        return <Loading></Loading>
    };

    if (enrollLoading) {
        return <Loading></Loading>
    };

    return (
        // <section className="max-w-[1440px] mx-auto">
        <section >
            <div className="navbar border-2">
                <div className="navbar-start">
                    <div className="dropdown">
                    </div>
                    <label htmlFor="my-drawer-2" className="btn lg:hidden"> <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg></label>
                    <Link to="/myhome" className="btn btn-ghost text-xl">Quick Edu Live</Link>
                </div>
                <div className="navbar-end gap-2">
                    <ProfileMenu></ProfileMenu>
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
                    <Sidebar 
                    classes={classes.data}
                    enrollClasses={enrollClasses.data}
                    ></Sidebar>
                </div>
            </div>
        </section>
    );
};

export default Main;