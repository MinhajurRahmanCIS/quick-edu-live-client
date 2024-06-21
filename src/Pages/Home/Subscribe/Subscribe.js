import React from 'react';
import toast from 'react-hot-toast';

const Subscribe = () => {
    const handelSubscribe = (e) => {
        e.preventDefault();
        const form = e.target;
        form.reset();
        toast.success("Subscribe Successfully")
    };
    return (
        <div className="bg-base-200 flex flex-col justify-center items-center p-20">
        {/* <span className="btn btn-ghost text-8xl font-bold">Quick Edu Live</span> */}
        <h1 className="text-5xl font-bold">Subscribe now!</h1>
        <p className="text-md font-semibold my-3">Subscribe to get all latest news from us.</p>
        <form onSubmit={handelSubscribe} className="join">
            <input 
            type="email"
            className="input input-bordered join-item" 
            placeholder="Enter Email"
            required
            />
            <input 
            className="btn btn-neutral join-item rounded-r-full"  
            type="submit" 
            value="Subscribe" 
            />
        </form>
    </div>
    );
};

export default Subscribe;