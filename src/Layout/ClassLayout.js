import React from 'react';
import ClassMenu from '../Pages/Shared/ClassMenu/ClassMenu';
import { Outlet } from 'react-router-dom';
const ClassLayout = () => {
    return (
        <div className="max-w-[1440px] mx-auto">
            <ClassMenu></ClassMenu>
            <Outlet></Outlet>
        </div>
    );
};

export default ClassLayout;