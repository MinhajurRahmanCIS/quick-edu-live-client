import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import Replies from './Replies';

const ReplyModal = ({ modal, setModal }) => {
    const { user } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const currentDate = new Date();

    const handelComment = (data, event) => {
        const classComment = {
            announcementId: modal._id,
            userName: user.displayName,
            photoURL: user.photoURL,
            comment: data.comment,
            date: format(currentDate, "d/MM/yyyy HH:mm:ss a"),
        };
        // console.log(classComment);
        fetch("http://localhost:5000/announcements", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(classComment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.data.insertedId) {
                    toast.success("Comment Successfully");
                    event.target.reset();
                    setModal(null);
                };
            })
    };





    return (
        <div>
            {/* The button to open modal */}
            <input type="checkbox" id="reply-modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <label htmlFor="reply-modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl font-bold">X</label>
                    <form onSubmit={handleSubmit(handelComment)} className="card-body">
                        <h1 className="text-2xl font-bold">Replies</h1>
                        <Replies 
                        modal={modal}
                        isTeacher={modal.isTeacher}
                        >
                        </Replies>
                        <div className="form-control">
                            <label className="label">
                                <span className="text-xl font-semibold">Comment</span>
                            </label>
                            <input {...register("comment",
                                {
                                    required: { value: true, message: "Comment is Required" }
                                })}
                                type="text" placeholder="Write a Comment!" className="input input-bordered" />
                            <div className="label">
                                {/* {errors.name && <p className="text-red-600">{errors.name.message}</p>} */}
                            </div>
                        </div>
                        <input className="btn btn-neutral" type="submit" value="Comment" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReplyModal;