import React from 'react';
import { FaRegAddressCard } from "react-icons/fa6";
import { IoCodeSlash } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const ClassCard = ({ c, refetch }) => {
    const { _id, name, subject, section, photoURL, classCode } = c;
    const handelCopyCode = classCode => {
        navigator.clipboard.writeText(classCode)
            .then(() => {
                // console.log('Code copied to clipboard:', code);
                toast.success('Code copied to clipboard!');
            })
            .catch(err => {
                // console.error('Failed to copy code to clipboard:', err);
                toast.error('Failed to copy code to clipboard. Please try again.');
            });
    };

    const handelDeleteClass = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this Class!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete Class"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/classes/${id}`, {
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
                            title: "Class Deleted!",
                            text: "Your Class has been deleted.",
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

                    <div onClick={() => handelCopyCode(classCode)} className="text-3xl hover:bg-slate-400 tooltip" data-tip={classCode}><IoCodeSlash></IoCodeSlash></div>

                    <div onClick={() => handelDeleteClass(_id)} className="text-3xl hover:bg-slate-400 tooltip" data-tip={"Delete Class"}><RiDeleteBin6Line></RiDeleteBin6Line></div>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;