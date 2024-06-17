import React, { useContext } from 'react';
import { BsFileEarmarkSpreadsheet } from 'react-icons/bs';
import { FaFileDownload, FaPrint, FaRegAddressCard, FaRegEye } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoCodeSlash } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbReportAnalytics } from 'react-icons/tb';
import { AuthContext } from '../../contexts/AuthProvider';
import useTeacher from '../../hooks/useTeacher';
import Loading from '../Shared/Loading/Loading';
import { RxCross2 } from 'react-icons/rx';
import { Helmet } from 'react-helmet-async';

const Help = () => {
    const { user } = useContext(AuthContext);
    const [isTeacher, isTeacherLoading] = useTeacher(user?.email);
    if (isTeacherLoading) {
        return <Loading></Loading>
    };
    return (
        <div className="overflow-x-auto p-10">
            <Helmet>
                <title>
                    Help
                </title>
            </Helmet>
            <table className="table border border-black">
                <thead>
                    <tr className="text-center text-xl border border-black">
                        <th className="border-e border-black">Icon</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover text-center border-b border-black font-semibold">
                        <td className="border-e border-black flex justify-center items-center">
                            <FaRegAddressCard className="text-5xl" />
                        </td>
                        <td className="text-lg">View Class Profile</td>
                    </tr>
                    {
                        isTeacher &&
                        <tr className="hover text-center border-b border-black font-semibold">
                            <td className="border-e border-black flex justify-center items-center">
                                <IoCodeSlash className="text-5xl" />
                            </td>
                            <td className="text-lg">Copy Class Code</td>
                        </tr>
                    }
                    <tr className="hover text-center border-b border-black font-semibold">
                        <td className="border-e border-black flex justify-center items-center">
                            <RiDeleteBin6Line className="text-5xl" />
                        </td>
                        <td className="text-lg">Delete</td>
                    </tr>
                    <tr className="hover text-center border-b border-black font-semibold">
                        <td className="border-e border-black flex justify-center items-center">
                            <FaRegEye className="text-5xl" />
                        </td>
                        <td className="text-lg">View Question</td>
                    </tr>
                    {isTeacher &&
                        <>
                            <tr className="hover text-center border-b border-black font-semibold">
                                <td className="border-e border-black flex justify-center items-center">
                                    <BsFileEarmarkSpreadsheet className="text-5xl" />
                                </td>
                                <td className="text-lg">View Quiz Submission</td>
                            </tr>
                            <tr className="hover text-center border-b border-black font-semibold">
                                <td className="border-e border-black flex justify-center items-center">
                                    <TbReportAnalytics className="text-5xl" />
                                </td>
                                <td className="text-lg">View Assignment Submission</td>
                            </tr>
                            <tr className="hover text-center border-b border-black font-semibold">
                                <td className="border-e border-black flex justify-center items-center">
                                    <FaPrint className="text-5xl text-info" />
                                </td>
                                <td className="text-lg">Print Question</td>
                            </tr>
                            <tr className="hover text-center border-b border-black font-semibold">
                                <td className="border-e border-black flex justify-center items-center">
                                    <FaFileDownload className="text-5xl" />
                                </td>
                                <td className="text-lg">File Download</td>
                            </tr>
                        </>
                    }

                    <tr className="hover text-center border-b border-black font-semibold">
                        <td className="border-e border-black flex justify-center items-center">
                            <RxCross2  className="text-5xl" />
                        </td>
                        <td className="text-lg">Close</td>
                    </tr>
                    <tr className="hover text-center border-b border-black font-semibold">
                        <td className="border-e border-black flex justify-center items-center">
                            <IoIosArrowDown className="text-5xl" />
                        </td>
                        <td className="text-lg">Collapse / Closed</td>
                    </tr>
                    <tr className="hover text-center border-b border-black font-semibold">
                        <td className="border-e border-black flex justify-center items-center">
                            <IoIosArrowUp className="text-5xl" />
                        </td>
                        <td className="text-lg">Expand / Open</td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
};

export default Help;
