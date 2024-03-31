import React from 'react';
import { Link } from 'react-router-dom';
import signupImage from '../../assets/signup/signup.png';
import { useForm } from 'react-hook-form';
const Signup = () => {
    // Taking Signup Data with React Hook Form
    const { register, formState: { errors }, handleSubmit, watch } = useForm();

    const handelLogin = (data, event) => {
        console.log(data)
        event.target.reset();
    };
    return (
        <div className="hero my-10">
            <div className="hero-content grid md:grid-cols-2 gap-20">
                <div className="card shadow-2xl border">
                    <form onSubmit={handleSubmit(handelLogin)} className="card-body">
                        <h1 className="text-2xl text-center font-semibold">Please Login</h1>
                        <hr />

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register("name",
                                {
                                    required: { value: true, message: "Name is Required" }
                                })}
                                type="text" placeholder="Enter Your Name" className="input input-bordered" />
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
                                type="text" placeholder="Enter Your Institution Name" className="input input-bordered" />
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
                                type="text" placeholder="Enter Your Country Name" className="input input-bordered" />
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
                                    required: { value: true, message: "Date is Required" }
                                })}
                                type="date" className="input input-bordered" />
                            <div className="label">
                                {errors.date && <p className="text-red-600">{errors.date.message}</p>}
                            </div>
                        </div>

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
                                type="email" placeholder="Enter Your Email Address" className="input input-bordered" />
                            <div className="label">
                                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password",
                                {
                                    required: { value: true, message: "Password is Required" },
                                    minLength: { value: 8, message: "Password must be 8 characters long" },
                                    pattern: {
                                        value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                                        message: 'Password must have uppercase, number and special characters'
                                    }
                                })}
                                type="password" placeholder="Enter Your Password" className="input input-bordered" />
                            <div className="label">
                                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input {...register("confirmPassword",
                                {
                                    required: { value: true, message: "Please Confirm Your Password" },
                                    validate: value =>
                                        value === watch("password") || "Passwords don't match"
                                })}
                                type="password" placeholder="Enter Your Password" className="input input-bordered" />
                            <div className="label">
                                {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>

                        <div className="form-control">
                            <input type="submit" value="Signup" className="btn btn-neutral hover:bg-slate-600 text-xl font-semibold" />
                        </div>

                        <div className="label">
                            <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">content</div>
                            <div className="divider divider-horizontal">OR</div>
                            <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">content</div>
                        </div>
                    </form>
                </div>
                <div>
                    <img src={signupImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Signup;