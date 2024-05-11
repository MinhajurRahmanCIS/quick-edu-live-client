import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../contexts/AuthProvider';
import useTeacher from '../../../../hooks/useTeacher';

const AllAnnouncement = ({ announcement, refetch, setModal }) => {
    const { user } = useContext(AuthContext);
    const [isTeacher] = useTeacher(user?.email);
    const { _id, userName, photoURL, date, message } = announcement;

    const handelDeleteAnnouncement = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this Announcement!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete Announcement"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/announcements/${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Announcement Deleted!",
                                text: "Your Announcement has been deleted.",
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

    // if (isLoading) {
    //     return <Loading></Loading>
    // };

    const userComment = 
    {
        _id, isTeacher
    };
    return (
        <div className="border p-10">
            <div className="flex items-center gap-3">
                <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={photoURL} alt="" />
                    </div>
                </div>
                {userName}
                <br />
                {date}
            </div>
            <p className="my-5">{message}</p>
            <div className="flex justify-end items-center gap-2">
                <label htmlFor="reply-modal" className="btn btn-neutral btn-sm" onClick={() => setModal(userComment)}>
                    Reply
                    {/* <span className="text-md font-bold">Create Class</span> */}
                </label >
                {
                    isTeacher &&
                    <button onClick={() => handelDeleteAnnouncement(_id)} className="btn btn-error btn-sm">Delete</button>
                }
            </div>
        </div>
    );
};

export default AllAnnouncement;