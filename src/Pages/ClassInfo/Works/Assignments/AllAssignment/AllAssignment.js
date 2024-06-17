import React from 'react';
import { FaRegEye } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbReportAnalytics } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAssignmentSubmission from '../../../../../hooks/useAssignmentSubmission';
import Loading from '../../../../Shared/Loading/Loading';

const AllAssignment = ({ assignment, i, refetch, isTeacher, assignmentSubmissions }) => {
    const { _id, topic, assignmentNo, date, level } = assignment;
    const { viewAssignmentSubmissions, viewAssignmentSubmissionsLoading } = useAssignmentSubmission(_id);
    const handelDeleteQuiz = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this Assignment!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete Assignment"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/classwork/${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Assignment Deleted!",
                                text: "Your Assignment has been deleted.",
                                icon: "success"
                            });
                        }
                        else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong! Please Try Again"
                            });
                        }
                    })
            };
        });
    };
    const hasSubmitted = assignmentSubmissions.some(submission => submission.assignmentId === _id);
    if (viewAssignmentSubmissionsLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="card bg-base-100 shadow-md rounded-none hover:shadow-xl border-2">
            {
                isTeacher ?
                    <Link to={`/viewassignment/${_id}/${hasSubmitted}`}>
                        <div className="flex justify-center items-center">
                            <div className="avatar placeholder cursor-pointer mt-3">
                                <div className="bg-neutral text-neutral-content rounded-full w-32 border-10 border-red-600 hover:shadow-2xl">
                                    <span className="text-4xl font-bold">{topic[0]}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    :
                    <Link to={`/viewassignment/${_id}/${hasSubmitted}`}>
                        <div className="flex justify-center items-center">
                            <div className="avatar placeholder mt-3">
                                <div className="bg-neutral text-neutral-content rounded-full w-32 border-10 border-red-600 hover:shadow-2xl">
                                    <span className="text-4xl font-bold">{topic[0]}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
            }

            <div className="card-body text-md">
                <p><strong>Assignment No : </strong> {i + 1}</p>
                <h2><strong>Topic : </strong> {topic} </h2>
                <p><strong>Date : </strong>{date}</p>
                {
                    isTeacher &&
                    <>
                        <p><strong>Difficulty Level : </strong>{level}</p>
                        {viewAssignmentSubmissions?.data?.length > 0 &&
                            <p><strong>Total Submission : </strong>{viewAssignmentSubmissions?.data?.length} </p>}
                    </>
                }
                <div className="card-actions justify-end gap-3">
                    {
                        isTeacher &&
                        <Link to={`/viewassignmentsubmission/${_id}`} className="text-3xl hover:bg-slate-400 tooltip" data-tip={"View Assignment"}><TbReportAnalytics></TbReportAnalytics></Link>
                    }
                    <Link to={`/viewassignment/${_id}/${hasSubmitted}`} className="text-3xl hover:bg-slate-400 tooltip" data-tip={"View Assignment"}><FaRegEye></FaRegEye></Link>
                    {
                        isTeacher &&
                        <div onClick={() => handelDeleteQuiz(_id)} className="text-3xl hover:bg-slate-400 tooltip" data-tip={"Delete Assignment"}><RiDeleteBin6Line></RiDeleteBin6Line></div>
                    }
                </div>
            </div>
        </div>
    );
};

export default AllAssignment;
