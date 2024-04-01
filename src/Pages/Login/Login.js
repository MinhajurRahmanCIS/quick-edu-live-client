import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../../assets/login/Login.png';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
const Login = () => {
    const { register, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const handelSignup = (data, event) => {
        setLoginError("");
        console.log(data)
        event.target.reset();
    };
    return (
        <div className="hero my-10">
            <div className="hero-content grid md:grid-cols-2 gap-20">
                <div className="card shadow-2xl border">
                    <form onSubmit={handleSubmit(handelSignup)} className="card-body">
                        <h1 className="text-2xl text-center font-semibold">Login</h1>
                        <hr />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email",
                                {
                                    required: { value: true, message: "Email Address is Required" }
                                })}
                                type="email" placeholder="Enter Your Email Address" className="input input-bordered" />
                            <div className="label">
                                {/* {errors.email && <p className="text-red-600">{errors.email.message}</p>} */}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password",
                                {
                                    required: { value: true, message: "Password is Required" }
                                }
                            )}
                                type="password" placeholder="Enter Your Password" className="input input-bordered" />
                            <div className="label">
                                {/* {errors.password && <p className="text-red-600">{errors.password.message}</p>} */}
                            </div>
                        </div>

                        <div className="form-control">
                            <input type="submit" value="Login" className="btn btn-neutral hover:bg-slate-600 text-xl font-semibold" />
                        </div>

                        <label className="label">
                            
                        </label>

                        <label className="text-center">
                            <span className="">Haven't an Account! <Link to="/signup" className="text-info hover:text-primary">Signup</Link></span>
                        </label>

                        <div>
                            <button className="btn w-full"><FcGoogle className="text-4xl"></FcGoogle> <span className="text-xl">Google</span></button>
                            <div className="divider">OR</div>
                            <button className="btn w-full"><FaGithub className="text-4xl"></FaGithub> <span className="text-xl">Github</span></button>
                        </div>
                    </form>
                </div>
                <div>
                    <img src={loginImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Login;