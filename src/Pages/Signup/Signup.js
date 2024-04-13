import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupImage from '../../assets/signup/Signup.png';
import { useForm } from 'react-hook-form';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';
const Signup = () => {
    // Taking Signup Data with React Hook Form
    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
    const imageHostKey = process.env.REACT_APP_imgBB_key;
    const [signupError, setSignupError] = useState("");
    const [createdUserEmail, setCreatedUserEmail] = useState("")
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    const handelSignup = (data, event) => {
        setSignupError("");

        // Create New User Function
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                // Image formatting to send ImageBB Host Server
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
                        const userInfo = {
                            displayName: data.name,
                            photoURL: imageData.data.url
                        };
                        updateUser(userInfo)
                            .then(() => {
                                const user = {
                                    name: data.name,
                                    email: data.email,
                                    image: imageData.data.url,
                                    role: "",
                                    account: "",
                                    institution: data.institution,
                                    country: data.country,
                                    dob: data.dob
                                };
                                saveUser(user);
                            })
                            .catch(error => {
                                setSignupError(error.message);
                            })
                    })
            })
            .catch(error => {
                setSignupError(error.message);
            })
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const loggedUser = result.user;
                const user = {
                    name: loggedUser.displayName,
                    email: loggedUser.email,
                    image: loggedUser.photoURL,
                    role: "",
                    account: "",
                    institution: "",
                    country: "",
                    dob: ""
                };
                saveUser(user);
            })
            .catch(error => console.error(error));
    };

    const saveUser = user => {
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCreatedUserEmail(user.email);
            });
    };

    if (token) {
        navigate("/myhome");
        toast.success("Account Created!");
    };

    return (
        <div className="hero my-10">
            <div className="hero-content grid md:grid-cols-2 gap-20">
                <div className="card shadow-2xl border">
                    <form onSubmit={handleSubmit(handelSignup)} className="card-body">
                        <h1 className="text-2xl text-center font-semibold">Signup</h1>
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
                            <input {...register("dob",
                                {
                                    required: { value: true, message: "Date of birth is Required" }
                                })}
                                type="date" className="input input-bordered" />
                            <div className="label">
                                {errors.dob && <p className="text-red-600">{errors.dob.message}</p>}
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
                                type="password" placeholder="Confirm Your Password" className="input input-bordered" />
                            <div className="label">
                                {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Insert Your Photo</span>
                            </label>
                            <input {...register("image",
                                {
                                    required: { value: true, message: "Photo is Required" },
                                    validate: (value) =>
                                        ['image/png', 'image/jpeg', 'image/jpg'].includes(value[0]?.type) ||
                                        'Invalid Photo format. Only PNG, JPEG and JPG files are allowed.',

                                })}
                                type="file" accept=".png, .jpg, .jpeg, .gif" className="file-input file-input-bordered w-full" />
                            <div className="label">
                                {errors.image && <p className="text-red-600">{errors.image.message}</p>}
                            </div>
                        </div>

                        <div className="form-control">
                            <input type="submit" value="Signup" className="btn btn-neutral hover:bg-slate-600 text-xl font-semibold" />
                        </div>

                        <div className="label">
                            {signupError && <p className="text-red-600">{signupError}</p>}
                        </div>

                        <label className="text-center">
                            <span className="">Already Have Account! <Link to="/login" className="text-info hover:text-primary">Login</Link></span>
                        </label>

                        <div>
                            <button onClick={handleGoogleSignIn} className="btn w-full"><FcGoogle className="text-4xl"></FcGoogle> <span className="text-xl">Google</span></button>
                            <div className="divider">OR</div>
                            <button className="btn w-full"><FaGithub className="text-4xl"></FaGithub> <span className="text-xl">Github</span></button>
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