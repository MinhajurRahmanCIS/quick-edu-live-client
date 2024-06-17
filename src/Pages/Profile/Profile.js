import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../Shared/Loading/Loading';
import { useForm } from 'react-hook-form';
import useLoadUser from '../../hooks/useLoadUser';
import { IoDiamond } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentDuotone } from "react-icons/pi";
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { userInfo, userIsLoading, refetch } = useLoadUser(user);
    if (userIsLoading) {
        return <Loading></Loading>;
    };
    const { _id, name, email, institution, country, dob, role, image, account } = userInfo.data;
    // console.log(userInfo.data);

    const handelUpdateProfile = data => {
        fetch(`http://localhost:5000/users/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                toast.success("Profile Update Successfully");
                refetch();
                console.log(data);
            })
    };


    return (
        <section>
            <Helmet>
                <title>
                   {name}'s Profile
                </title>
            </Helmet>
            <form onSubmit={handleSubmit(handelUpdateProfile)} className="card-body">
                <div>
                    <div className="avatar">
                        <div className="w-40 rounded-full border border-black">
                            <img src={image} alt="" />
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Your Email Address"
                            className="input input-bordered"
                            defaultValue={email}
                            disabled />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            className="input input-bordered"
                            defaultValue={name}
                            disabled
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Institution</span>
                        </label>
                        <input {...register("institution",
                            {
                                required: { value: true, message: "Institution Name is Required" }
                            })}
                            type="text"
                            placeholder="Please Enter Your Institution Name" className="input input-bordered"
                            defaultValue={institution}
                            disabled={institution} />
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
                                required: { value: true, message: "Country Name is Required" }
                            })}
                            type="text"
                            placeholder="Please Enter Your Country Name"
                            className="input input-bordered"
                            defaultValue={country}
                            disabled={country}
                        />
                        <div className="label">
                            {errors.country && <p className="text-red-600">{errors.country.message}</p>}
                        </div>
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date of Birth</span>
                        </label>
                        <input {...register("dob",
                            {
                                required: { value: true, message: "Please Enter your Date of birth" }
                            })}
                            type="date"
                            className="input input-bordered"
                            defaultValue={dob}
                            disabled={dob} />
                        <div className="label" >
                            {errors.dob && <p className="text-red-600">{errors.dob.message}</p>}
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Role</span>
                        </label>
                        {
                            role ?
                                <Link className="btn md:w-1/3">
                                    {
                                        role === "Teacher" ?
                                            <span className="flex items-center gap-2 ms-0.5"><FaChalkboardTeacher></FaChalkboardTeacher>Teacher</span>
                                            :
                                            <span className="flex items-center gap-2 ms-0.5">Student<PiStudentDuotone></PiStudentDuotone></span>
                                    }
                                </Link>
                                :
                                <div className="flex items-center">
                                    <input {...register("role",
                                        {
                                            required: { value: true, message: "Role is Required" }
                                        })}
                                        type="radio"
                                        name="role"
                                        value={"Teacher"}
                                        className="radio radio-neutral" />
                                    <span className="mx-3 text-xl">Teacher</span>
                                    <input {...register("role",
                                        {
                                            required: { value: true, message: "Role is Required" }
                                        })}
                                        type="radio"
                                        name="role"
                                        value={"Student"}
                                        className="radio radio-info" />
                                    <span className="mx-3 text-xl">Student</span>
                                </div>
                        }
                        <div className="label" >
                            {errors.role && <p className="text-red-600">{errors.role.message}</p>}
                        </div>
                    </div>

                    {
                        role === "Teacher" &&

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Account Type</span>
                            </label>
                            {
                                account === "Premium" ?
                                    <span className="flex items-center gap-2 text-xl text-[#d4af37] ms-0.5 btn md:w-1/2 bg-slate-900 hover:bg-slate-700"><strong>Premium</strong><IoDiamond></IoDiamond></span>
                                    : <Link to="/myhome/checkout" className="btn btn-neutral w-1/5">Buy Premium</Link>
                            }
                            <div className="label" >
                                {errors.date && <p className="text-red-600">{errors.date.message}</p>}
                            </div>
                        </div>
                    }
                </div>
                {
                    !role
                    &&
                    (
                        <div className="form-control mt-2">
                            <input type="submit" value="Update Profile" className="btn btn-neutral hover:bg-slate-600 text-xl font-semibold" />
                        </div>
                    )
                }
            </form>
        </section>
    );
};

export default Profile;