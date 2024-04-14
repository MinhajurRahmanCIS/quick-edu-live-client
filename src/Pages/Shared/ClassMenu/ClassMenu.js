import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const ClassMenu = () => {
    const { id } = useParams();
    return (
        <ul className="menu bg-base-200 lg:menu-horizontal w-full my-2 border gap-0.5">
            <li className="border rounded-lg">
                <Link to={`/myhome/classinfo/${id}`} >
                    
                    Class
                    {/* <span className="badge badge-sm">99+</span> */}
                </Link>
            </li>
            <li className="border rounded-lg">
                <Link to={`/myhome/classinfo/works/${id}`}>
                   
                    Classwork
                    {/* <span className="badge badge-sm badge-warning">NEW</span> */}
                </Link>
            </li>
            <li className="border rounded-lg">
                <Link to={`/myhome/classinfo/classpeople/${id}`}>
                    People
                    {/* <span className="badge badge-xs badge-info"></span> */}
                </Link>
            </li>
        </ul>
    );
};

export default ClassMenu;