import React from 'react';
import { FaRegAddressCard } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ClassEnrollCard = ({c, refetch}) => {
    const { _id, name, subject, section, photoURL } = c.classInfo[0];

    const handelEnrollDeleteClass = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this Enroll Class!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete Enroll Class"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/enrollments/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if(data.data.deletedCount > 0){
                        refetch();
                        Swal.fire({
                            title: "Enroll Class Deleted!",
                            text: "Your Enroll Class has been deleted.",
                            icon: "success"
                        });
                    }
                    else{
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
    return (
        <div className="card bg-base-100 shadow-md rounded-none hover:shadow-xl">
            <Link to={`/myhome/classinfo/${_id}`}><img className="object-fill h-[250px] w-full cursor-pointer" src={photoURL} alt={name + " Class Image"} /></Link>
            <div className="card-body">
                <h2 className="card-title">
                    {name}
                </h2>
                <p>{subject}</p>
                <p>Section: {section}</p>
                <div className="card-actions justify-end gap-3">
                    <Link to={`/myhome/classinfo/${_id}`} className="text-3xl hover:bg-slate-400 tooltip" data-tip={"Class Info"}><FaRegAddressCard></FaRegAddressCard></Link>

                   

                    <div onClick={() => handelEnrollDeleteClass(c._id)} className="text-3xl hover:bg-slate-400 tooltip" data-tip={"Delete Class"}><RiDeleteBin6Line></RiDeleteBin6Line></div>
                </div>
            </div>
        </div>
    );
};

export default ClassEnrollCard;