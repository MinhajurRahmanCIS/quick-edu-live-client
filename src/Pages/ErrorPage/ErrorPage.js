import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import err from '../../assets/ErrorPage/err.png';
import { Helmet } from 'react-helmet-async';
const ErrorPage = () => {
    const { error, status } = useRouteError();
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
             <Helmet>
                <title>
                  Error
                </title>
            </Helmet>
            {/* <h1 className=" text-7xl font-extrabold mb-8">Error {status || 404}</h1> */}
            <img src={err} alt=""></img>
            <p className="lg:text-3xl my-5">{error?.message}</p>
            <Link className="btn bg-red-500 text-white" to={-1}>Go Back</Link>
        </div>
    );
};

export default ErrorPage;