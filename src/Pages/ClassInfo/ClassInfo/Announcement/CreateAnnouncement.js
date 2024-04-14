import { format } from 'date-fns';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
const CreateAnnouncement = ({user, classData, refetch}) => {
    const { register, handleSubmit } = useForm();
    const currentDate = new Date();
    const handelAnnouncement = (data, event) => {
        const classAnnouncement = {
            userName: user.displayName,
            photoURL: user.photoURL,
            message: data.announcement,
            classId: classData._id,
            date: format(currentDate, "d/MM/yyyy HH:mm:ss a"),
        };
        fetch("http://localhost:5000/announcements", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(classAnnouncement)
        })
        .then(res => res.json())
        .then(data => {
            if(data.data.insertedId){
                toast.success("Announcement Published!");
                event.target.reset();
                refetch();
            };
        })
    };
    return (
        <div className="my-5 p-2">
            <form onSubmit={handleSubmit(handelAnnouncement)}>
                <h3 className="text-2xl font-bold mb-2">Announcement</h3>
                <textarea {...register("announcement")} placeholder="Write an Announcement..." className="textarea textarea-bordered textarea-lg w-full" ></textarea>
                <div className="flex justify-end">
                    <input className="btn btn-neutral mt-1" type="submit" value="Post" />
                </div>
            </form>

        </div>
    );
};

export default CreateAnnouncement;