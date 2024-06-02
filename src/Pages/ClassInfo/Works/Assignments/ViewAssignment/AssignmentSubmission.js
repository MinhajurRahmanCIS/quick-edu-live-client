import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Shared/Loading/Loading';
import { FiTrash2 } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import Swal from 'sweetalert2';

const AssignmentSubmission = ({ assignment, hasSubmitted }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const upFileKey = process.env.REACT_APP_upFILE_KEY;

    const { data: assignmentUpdate = [], isLoading: assignmentUpdateLoading, refetch } = useQuery({
        queryKey: ["assignmentUpdate", assignment.userEmail],
        queryFn: () => fetch(`http://localhost:5000/checkSubmission?email=${assignment.userEmail}&assignment=true`, {
            headers: {
                authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
            }
        }).then(res => res.json())
    });

    const handleUpload = (event) => {
        event.preventDefault();
        const form = event.target;
        const file = form.file.files[0];

        if (!file) {
            toast.error("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('token', upFileKey);

        fetch('https://api.upfiles.com/upload', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === 'success') {
                    const updatedAssignment = {
                        ...assignment,
                        fileURL: result.url,
                        fileName: file.name
                    };

                    return fetch("http://localhost:5000/submission", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                        },
                        body: JSON.stringify(updatedAssignment)
                    });
                } else {
                    throw new Error(result.message || "File upload failed");
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success("Submission Success");
                    setMessage('');
                    refetch();
                    navigate(-1);
                } else {
                    toast.error("Submission failed");
                }
            })
            .catch(err => {
                toast.error(`An error occurred: ${err.message}`);
            });
    };

    if (assignmentUpdateLoading) {
        return <Loading />;
    }

    const matchingAssignment = assignmentUpdate?.data?.find(item => item?.assignmentId === assignment?.assignmentId);

    const handelRemove = id => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this file!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/submission/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data?.data?.deletedCount > 0) {
                            toast.success("Submission Deleted");
                            navigate(-1);
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });

    }

    return (
        <>
            {!hasSubmitted ?
                <div className="my-5">
                    <h1 className="text-3xl font-bold">Note</h1>
                    <p className="text-xl text-justify">
                        <span className="font-bold text-red-600">Read It Carefully -</span>
                        <br />
                        1. Document Name must contain Student Name, Id and Subject.
                        <span className="font-bold"> Example: Md_Minhajur_Rahman_193_16_477_OOP</span>
                        <br />
                        2. To submitting multiple file zip it.
                        <br />
                        3. Complete Your Submission on or before the deadline. No excuses after the deadline.
                        <br />
                        4. Accepted file formats: Doc, Docx, and PDF only.
                    </p>

                    <form onSubmit={handleUpload}>
                        <div className="flex flex-col">
                            <input
                                className="file-input file-input-bordered file-input-lg w-full max-w-xs my-5"
                                accept=".pdf, .docx"
                                name="file"
                                type="file"
                            />
                            {message && <p>{message}</p>}
                            <input
                                className="btn btn-neutral w-full max-w-xs"
                                type="submit"
                                value="Upload" />
                        </div>
                    </form>
                </div>
                :
                <div className="p-10">
                    <h1 className="text-2xl text-center font-bold my-2">Submission Done</h1>
                    <div className="overflow-x-auto border">
                        <table className="table text-center">
                            <thead className="text-black text-2xl">
                                <tr>
                                    <th>File Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-xl font-bold">{matchingAssignment?.fileName}</td>
                                    <td>

                                        <div className="join join-vertical lg:join-horizontal gap-2">
                                            <div className="tooltip" data-tip={"View File"}>
                                                <a className="btn btn-neutral text-3xl" href={matchingAssignment?.fileURL} target="_blank" rel="noopener noreferrer"> <GrView />
                                                </a>
                                            </div>
                                            <div onClick={() => handelRemove(matchingAssignment?._id)} className="tooltip" data-tip={"Delete"}>
                                                <button className="btn btn-error text-white text-3xl font-bold">
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    );
};

export default AssignmentSubmission;
