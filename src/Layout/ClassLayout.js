import React from 'react';
import ClassMenu from '../Pages/Shared/ClassMenu/ClassMenu';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
const ClassLayout = () => {
    return (
        <div className="max-w-[1440px] mx-auto">
            <ClassMenu></ClassMenu>
            <Outlet></Outlet>
            <Toaster></Toaster>
        </div>
    );
};

export default ClassLayout;