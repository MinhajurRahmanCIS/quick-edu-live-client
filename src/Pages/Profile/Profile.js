import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../Shared/Loading/Loading';
import { useForm } from 'react-hook-form';
import useLoadUser from '../../hooks/useLoadUser';
import { IoDiamond } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FaChalkboardTeacher } from "react-icons/fa";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const { userInfo, isLoading, refetch } = useLoadUser(user);
    if (isLoading) {
        return <Loading></Loading>
    };
    const { _id, role, name, email, institution, country, dob, image, account } = userInfo.data;
    // console.log(userInfo.data);

    const handelUpdateProfile = data => {
        // const haveImage = data.image.length === 0 ? "" : data.image;
        // const newData = {
        //     institution: data.institution,
        //     country: data.country,
        //     dob: data.dob,
        //     image: haveImage,
        //     role: data.role
        // };
        // console.log(newData)
        fetch(`http://localhost:5000/users/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                console.log(data);
            })
    };


    return (
        <section>
            <form onSubmit={handleSubmit(handelUpdateProfile)} className="card-body">
                <div>
                    <div className="avatar">
                        <div className="w-40 rounded-full border border-black">
                            <img src={image} alt="" />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Update Your Photo</span>
                        </label>
                        <input {...register("image")}
                            type="file" accept=".png, .jpg, .jpeg, .gif" className="file-input file-input-bordered file-input-sm" />
                        <div className="label">
                            {errors.image && <p className="text-red-600">{errors.image.message}</p>}
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email" placeholder="Enter Your Email Address" className="input input-bordered" disabled defaultValue={email} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text" placeholder="Enter Your Name" className="input input-bordered" disabled defaultValue={name} />
                    </div>

                    {/* <div className="form-control">
                        <label className="label">
                            <span className="label-text">Institution</span>
                        </label>
                        <input {...register("institution",
                            {
                                // required: { value: true, message: "Institution Name is Required" }
                            })}
                            type="text" placeholder="Please Enter Your Institution Name" className="input input-bordered" defaultValue={institution} />
                        <div className="label">
                            {errors.institution && <p className="text-red-600">{errors.institution.message}</p>}
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Country</span>
                        </label>
                        <input {...register("country",
                            {
                                // required: { value: true, message: "Country Name is Required" }
                            })}
                            type="text" placeholder="Please Enter Your Country Name" className="input input-bordered" defaultValue={country} />
                        <div className="label">
                            {errors.country && <p className="text-red-600">{errors.country.message}</p>}
                        </div>
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date of Birth</span>
                        </label>
                        <input {...register("date",
                            {
                                // required: { value: true, message: "Please Enter your Date of birth" }
                            })}
                            type="date" className="input input-bordered" defaultValue={dob} />
                        <div className="label" >
                            {errors.date && <p className="text-red-600">{errors.date.message}</p>}
                        </div>
                    </div> */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Role</span>
                        </label>
                        {
                            role ?
                                <Link className="btn w-1/5">
                                    {
                                        role === "Teacher" ?
                                            <span className="flex items-center gap-2 text-xl ms-0.5"><FaChalkboardTeacher></FaChalkboardTeacher>Teacher</span>
                                            :
                                            <span className="flex items-center gap-2 text-xl ms-0.5">Student<IoDiamond></IoDiamond></span>
                                    }
                                </Link>
                                :
                                <div className="flex items-center">
                                    <input {...register("role",
                                        {
                                            required: { value: true, message: "Role is Required" }
                                        })} type="radio" name="role" value={"Teacher"} className="radio radio-neutral" />
                                    <span className="mx-3 text-xl">Teacher</span>
                                    <input {...register("role",
                                        {
                                            required: { value: true, message: "Role is Required" }
                                        })} type="radio" name="role" value={"Student"} className="radio radio-info" />
                                    <span className="mx-3 text-xl">Student</span>
                                </div>
                        }
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Account Type</span>
                        </label>
                        {
                            account === "Premium" ?
                                <span className="flex items-center gap-2 text-xl text-[#d4af37] ms-0. btn bg-slate-900 hover:bg-slate-700 w-1/2 "><strong>Premium</strong><IoDiamond></IoDiamond></span>
                                : <Link className="btn btn-neutral w-1/5">Buy Premium</Link>
                        }
                        <div className="label" >
                            {errors.date && <p className="text-red-600">{errors.date.message}</p>}
                        </div>
                    </div>
                </div>
                <div className="form-control">
                    <input type="submit" value="Update Profile" className="btn btn-neutral hover:bg-slate-600 text-xl font-semibold" />
                </div>
            </form>
        </section>
    );
};

export default Profile;