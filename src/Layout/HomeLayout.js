import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const HomeLayout = () => {
    return (
        // <div className="max-w-[1440px] mx-auto">
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Toaster></Toaster>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;