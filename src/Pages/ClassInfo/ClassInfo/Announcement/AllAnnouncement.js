import React from 'react';

const AllAnnouncement = ({ announcement }) => {
    const { userName, photoURL, date, message } = announcement;
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
            </div>
    );
};

export default AllAnnouncement;