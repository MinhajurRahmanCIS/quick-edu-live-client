import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
const ProfileMenu = () => {
    const { user, logOut } = useContext(AuthContext);
    const { data: userInfo = [], isLoading } = useQuery({
        queryKey: ["User"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });
    if (isLoading) {
        return <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
    };
    const handelLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logout Successfully!")
            })
            .catch(err => console.log(err));
    };
    return (
        <>
            <p className="font-semibold hidden lg:block md:block"> {user?.uid && user?.displayName}</p>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 ring ring-neutral ring-offset-base-100 ring-offset-2 rounded-full">
                        <img src={user?.uid ? userInfo.data[0].image : "https://i.ibb.co/TbC7PBT/male-Student.png"} alt="User Profile" />
                    </div>
                </div>
                <ul tabIndex={1} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-1">
                    <li className="block md:hidden lg:hidden">
                        <Link className="justify-between">
                            <p className="font-semibold"> {user?.uid && user?.displayName}</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/myhome/profile" className="justify-between">
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
        </>
    );
};

export default ProfileMenu;