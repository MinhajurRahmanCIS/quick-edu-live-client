import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginImage from '../../assets/login/Login.png';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
const Login = () => {
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState("");
    const [loginUserEmail, setLoginUserEmail] = useState("")
    const [token] = useToken(loginUserEmail);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/myhome";

    const handelLogin = (data, event) => {
        setLoginError("");
        signIn(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                // console.log(loggedUser);
                setLoginUserEmail(data.email);
            })
            .catch(error => {
                setLoginError(error.message);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const loggedUser = result.user;
                setLoginUserEmail(loggedUser.email);
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        if (token) {
            toast.success("Login Successfully!");
            navigate(from, { replace: true });
        }
    }, [token, from, navigate]);

    return (
        <div className="hero mt-10 mb-36">
            <Helmet>
                <title>
                  Login
                </title>
            </Helmet>
            <div className="hero-content grid md:grid-cols-2 gap-20">
                <div className="card shadow-2xl border">
                    <form onSubmit={handleSubmit(handelLogin)} className="card-body">
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
                                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
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
                                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                            </div>
                        </div>

                        <div className="form-control">
                            <input type="submit" value="Login" className="btn btn-neutral hover:bg-slate-600 text-xl font-semibold" />
                        </div>

                        <div className="label">
                            {loginError && <p className="text-red-600">{loginError}</p>}
                        </div>

                        <div>
                            <button onClick={handleGoogleSignIn} className="btn w-full"><FcGoogle className="text-4xl"></FcGoogle> <span className="text-xl">Google</span></button>
                            {/* <div className="divider">OR</div>
                            <button className="btn w-full"><FaGithub className="text-4xl"></FaGithub> <span className="text-xl">Github</span></button> */}
                        </div>

                        <label className="text-center">
                            <span className="">Haven't an Account! <Link to="/signup" className="text-info hover:text-primary">Signup</Link></span>
                        </label>

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