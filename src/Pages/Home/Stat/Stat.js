import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { PiStudentDuotone } from 'react-icons/pi';
import { FaUsersLine, FaUsersRectangle } from 'react-icons/fa6';

const Stat = () => {
    const { data: userStat = [], isLoading } = useQuery({
        queryKey: ["User Stat"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });
    if (isLoading) {
        return <Loading></Loading>
    };

    const teachers = userStat.data.filter(t => t.role === "Teacher").length;
    const students = userStat.data.filter(t => t.role === "Student").length;

    return (
        <div className='flex justify-center p-10'>
            <div className="stats md:stats-horizontal stats-vertical shadow">
                <div className="stat">
                    <div className="stat-figure">
                        <FaChalkboardTeacher className="text-5xl"></FaChalkboardTeacher>
                    </div>
                    <div className="stat-title">Total Teachers</div>
                    <div className="stat-value ">{teachers}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure">
                        <PiStudentDuotone className="text-5xl"></PiStudentDuotone>
                    </div>
                    <div className="stat-title">Total Students</div>
                    <div className="stat-value">{students}</div>
                </div>

                <div className="stat">

                    <div className="stat-figure">
                        <FaUsersRectangle className="text-5xl"></FaUsersRectangle>
                    </div>
                    <div className="stat-value">{teachers + students}</div>
                    <div className="stat-title">Total Users</div>
                </div>
            </div>
        </div>
    );
};

export default Stat;