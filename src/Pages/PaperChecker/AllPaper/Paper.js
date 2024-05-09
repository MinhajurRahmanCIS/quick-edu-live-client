import React from 'react';
import { FaRegAddressCard } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Paper = ({ ap, refetch, i }) => {
    const { _id } = ap;
    const handelDeletePaper = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this Paper!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete Paper"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/check/${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Paper Deleted!",
                                text: "Your Paper has been deleted.",
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
    return (
        <div className="card bg-base-100 shadow-md rounded-none hover:shadow-xl">
            <Link to={`/myhome/papersummery/${_id}`}><img className="object-fill h-[250px] w-full cursor-pointer" src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/38-512.png" alt="" /></Link>
            <div className="card-body">
                <h2 className="card-title">
                    {/* {name} */} Paper No : {i+1}
                </h2>
                {/* <p>{subject}</p>
                <p>Section: {section}</p> */}
                <div className="card-actions justify-end gap-3">
                    <Link to={`/myhome/papersummery/${_id}`} className="text-3xl hover:bg-slate-400 tooltip" data-tip={"Paper"}><FaRegAddressCard></FaRegAddressCard></Link>

                    <div onClick={() => handelDeletePaper(_id)} className="text-3xl hover:bg-slate-400 tooltip" data-tip={"Delete Paper"}><RiDeleteBin6Line></RiDeleteBin6Line></div>
                </div>
            </div>
        </div>
    );
};

export default Paper;