import React from 'react';

const Class = ({ c }) => {
    const { _id, name, email, subject, section, photoURL, classCode, createdDate } = c;
    return (
        <div className="card bg-base-100 shadow-md rounded-none hover:shadow-xl">
            <figure><img className="object-fill h-[250px] w-full" src={photoURL} alt={name+" Class Image"} /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {name}
                </h2>
                <p>{subject}</p>
                <p>Section: {section}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                </div>
            </div>
        </div>
    );
};

export default Class;