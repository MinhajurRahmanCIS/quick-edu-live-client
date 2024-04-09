import React from 'react';
import { FaRegAddressCard } from "react-icons/fa6";
import { IoCodeSlash } from "react-icons/io5";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const ClassCard = ({ c }) => {
    const { _id, name, subject, section, photoURL, classCode } = c;
    const handelCopyCode = classCode => {
        navigator.clipboard.writeText(classCode)
            .then(() => {
                // console.log('Code copied to clipboard:', code);
                // Optionally, provide feedback to the user
                toast.success('Code copied to clipboard!');
            })
            .catch(err => {
                // console.error('Failed to copy code to clipboard:', err);
                // Optionally, handle errors
                toast.error('Failed to copy code to clipboard. Please try again.');
            });
    };

    return (
        <div className="card bg-base-100 shadow-md rounded-none hover:shadow-xl">
            <figure><img className="object-fill h-[250px] w-full" src={photoURL} alt={name + " Class Image"} /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {name}
                </h2>
                <p>{subject}</p>
                <p>Section: {section}</p>
                <div className="card-actions justify-end gap-3">
                    <Link to={`/myhome/classinfo/${_id}`} className="text-3xl hover:bg-slate-400 tooltip" data-tip={"ClassInfo"}><FaRegAddressCard></FaRegAddressCard></Link>
                    <div onClick={() => handelCopyCode(classCode)} className="text-3xl hover:bg-slate-400 tooltip" data-tip={classCode}><IoCodeSlash></IoCodeSlash></div>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;