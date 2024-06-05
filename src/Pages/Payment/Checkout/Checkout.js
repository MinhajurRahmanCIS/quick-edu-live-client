import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useLoadUser from '../../../hooks/useLoadUser';
import Loading from '../../Shared/Loading/Loading';
import toast from 'react-hot-toast';
import paper from "../../../assets/other/paper.jpg"

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const { userInfo, userIsLoading } = useLoadUser(user);
    const navigate = useNavigate();

    if (userIsLoading) {
        return <Loading></Loading>
    };

    const purchase = data => {
        fetch(`http://localhost:5000/payment/${data.data._id}`, {
            method: "PUT",
            headers: {
                authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    toast.success('Payment successfully!')
                    navigate("/myhome/payment");
                };
            });
    };
    return (
        // <div className="flex flex-col justify-center items-center p-48">
        //     <span className="text-xl"><strong>Price : </strong> 500</span>
        //     <Link onClick={()=>purchase(userInfo)} className="btn btn-neutral">Purchase Premium</Link>
        // </div>
        <div className="hero min-h-screen p-5">
            <div className="card lg:card-side bg-base-100 border rounded-none shadow-xl">
                <figure className="border-e"><img className="rounded-none w-[400px]" src={paper} alt="Album" /></figure>
                <div className="card-body">
                    <h1 className="card-title">Unlock The Future </h1>
                    <div className="flex gap-2">
                        <h3 className="font-semibold"><span className="text-5xl" >$10</span><span className="text-xl">.99</span></h3>
                        <p className="font-bold">Life <br /> Time</p>
                    </div>
                    <div className="flex justify-between my-2">
                        <div>
                            Ai Paper Checker
                        </div>
                        <div>
                            $10.99
                        </div>
                    </div>
                    <hr />
                    <div className="flex justify-between my-1">
                        <div>
                            Subtotal
                            <br />
                            Tax
                        </div>
                        <div>
                            $10.99
                            <br />
                             $0.00
                        </div>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <div>
                            Total
                        </div>
                        <div>
                            $10.99
                        </div>
                    </div>
                    <p>There will be no refund! <span className="text-blue-400 link-hover hover:text-blue-600 cursor-pointer">Term and condition</span></p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-neutral">Purchase</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;