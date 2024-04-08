import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Shared/Loading/Loading';
import { useForm } from 'react-hook-form';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const { data: userInfo = [], isLoading, refetch } = useQuery({
        queryKey: ["User"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });
    if (isLoading) {
        return <Loading></Loading>
    };
    const { name, email, institution, country, dob, image } = userInfo.data[0];

    return (
        <div>
            <form className="card-body">
                <div>
                    <div className="avatar">
                    <div className="w-40 rounded-full border border-black">
                        <img src={image} alt=""/>
                    </div>
                    </div>
                    <div className="form-control">
                            <label className="label">
                                <span className="label-text">Update Your Photo</span>
                            </label>
                            <input {...register("image",
                                {
                                    validate: (value) =>
                                        ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(value[0]?.type) ||
                                        'Invalid Photo format. Only PNG, JPEG, JPG, and GIF files are allowed.',

                                })}
                                type="file" accept=".png, .jpg, .jpeg, .gif" className="file-input file-input-bordered file-input-sm w-1/4" />
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
                            <input {...register("email",
                                {
                                    required: { value: true, message: "Email Address is Required" },
                                    pattern: {
                                        value: /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]/,
                                        message: 'Invalid Email. Example: ex@mail.com'
                                    }
                                })}
                                type="email" placeholder="Enter Your Email Address" className="input input-bordered" disabled defaultValue={email}/>
                            <div className="label">
                                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register("name",
                                {
                                    required: { value: true, message: "Name is Required" }
                                })}
                                type="text" placeholder="Enter Your Name" className="input input-bordered" defaultValue={name} />
                            <div className="label">
                                {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Institution</span>
                            </label>
                            <input {...register("institution",
                                {
                                    required: { value: true, message: "Institution Name is Required" }
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
                                    required: { value: true, message: "Country Name is Required" }
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
                                    required: { value: true, message: "Please Enter your Date of birth" }
                                })}
                                type="date" className="input input-bordered" defaultValue={dob} />
                            <div className="label" >
                                {errors.date && <p className="text-red-600">{errors.date.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="form-control">
                        <input type="submit" value="Update Profile" className="btn btn-neutral hover:bg-slate-600 text-xl font-semibold" />
                    </div>
            </form>
        </div>
    );
};

export default Profile;