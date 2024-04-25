import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const ClassModal = ({refetch, modal, setModal}) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const currentDate = new Date();
    const imageHostKey = process.env.REACT_APP_imgBB_key;

    const handelCreateClass = (data, event) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`,
            {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(imageData => {
                const classInfo = {
                    name: data.name,
                    email: modal,
                    subject: data.subject,
                    section: data.section,
                    photoURL: imageData.data.url,
                    classCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
                    createdDate: format(currentDate, "d/MM/yyyy HH:mm:ss")
                }
                
                fetch("http://localhost:5000/classes", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(classInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data.data);
                        if (data.data.insertedId) { 
                            toast.success("Class Created!");
                            setModal(null);
                            refetch();
                        };
                    })
            });
    }
    return (
        <div>
            {/* The button to open modal */}
            <input type="checkbox" id="class-modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <label htmlFor="class-modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl font-bold">X</label>
                    <form onSubmit={handleSubmit(handelCreateClass)} className="card-body">
                        <h1 className="text-2xl">Create Class</h1>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Name</span>
                            </label>
                            <input {...register("name",
                                {
                                    required: { value: true, message: "Class Name is Required" }
                                })}
                                type="text" placeholder="Enter Class Name" className="input input-bordered" />
                            <div className="label">
                                {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Subject</span>
                            </label>
                            <input {...register("subject",
                                {
                                    required: { value: true, message: "Subject is Required" }
                                })}
                                type="text" placeholder="Enter Subject Name" className="input input-bordered" />
                            <div className="label">
                                {errors.subject && <p className="text-red-600">{errors.subject.message}</p>}
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Section</span>
                            </label>
                            <input {...register("section",
                                {
                                    required: { value: true, message: "Section is Required" }
                                })}
                                type="text" placeholder="Enter Section Name" className="input input-bordered" />
                            <div className="label">
                                {errors.section && <p className="text-red-600">{errors.section.message}</p>}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Insert Class Image</span>
                            </label>
                            <input {...register("image",
                                {
                                    validate: (value) =>
                                        ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(value[0]?.type) ||
                                        'Invalid Photo format. Only PNG, JPEG and  JPG files are allowed.',

                                })}
                                type="file" accept=".png, .jpg, .jpeg" className="file-input file-input-bordered w-full" />
                            <div className="label">
                                {errors.image && <p className="text-red-600">{errors.image.message}</p>}
                            </div>

                            <div className="form-control">
                                <input type="submit" value="Create" className="btn btn-neutral hover:bg-slate-600 text-xl font-semibold" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ClassModal;