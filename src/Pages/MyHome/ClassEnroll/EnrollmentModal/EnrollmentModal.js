import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const EnrollmentModal = ({ modal, setModal, refetch }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const handelEnrollClass = (data, event) => {
        data.studentEmail = modal;
        fetch("http://localhost:5000/enrollments", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json()
                .then(data => {
                    // console.log(data);
                    if (data?.data?.insertedId) {
                        toast.success("Class Enrolled Successfully");
                        setModal(null);
                        refetch();
                    }
                    if (data?.alreadyEnrolledMessage) {
                        toast.error(data?.alreadyEnrolledMessage);
                    }
                    if (data?.noClassMessage) {
                        toast.error(data?.noClassMessage);
                    }
                })
            )
    };
    return (
        <div>
            {/* The button to open modal */}
            <input type="checkbox" id="enroll-modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <label htmlFor="enroll-modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl font-bold">X</label>
                    <form onSubmit={handleSubmit(handelEnrollClass)} className="card-body">
                        <h1 className="text-2xl">Enroll Course</h1>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Enrollment Key</span>
                            </label>
                            <input {...register("classCode",
                                {
                                    required: { value: true, message: "Enrollment key is Required" }
                                })}
                                type="text" placeholder="Enter Enrollment Key" className="input input-bordered" />
                            <div className="label">
                                {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                            </div>
                        </div>

                        <div className="form-control">
                            <input type="submit" value="Enroll" className="btn btn-neutral hover:bg-slate-600 text-xl font-semibold" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentModal;