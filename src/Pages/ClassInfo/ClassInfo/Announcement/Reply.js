import React from 'react';
import Swal from 'sweetalert2';

const Reply = ({ c, isTeacher, refetch }) => {
    const { _id, userName, photoURL, date, comment } = c;

    const handelDeleteComment = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this Comment!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete Comment"
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
                                title: "Comment Deleted!",
                                text: "Your Announcement has been Comment.",
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
    // console.log(c);
    return (
        <div className="border p-5 mb-3">
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
            <p className="mt-4">{comment}</p>
            {
                isTeacher &&
                    <div className="flex justify-end items-center gap-2">
                        <button onClick={() => handelDeleteComment(_id)} className="btn btn-error btn-sm">Delete</button>
                    </div> 
            }
        </div>
    );
};

export default Reply;