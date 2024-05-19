import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useLoadUser from '../../../hooks/useLoadUser';
import Loading from '../../Shared/Loading/Loading';
import toast from 'react-hot-toast';

const Checkout = () => {
    const {user} = useContext(AuthContext);
    const {userInfo, userIsLoading} = useLoadUser(user);
    const navigate = useNavigate();

    if(userIsLoading){
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
            if(data.data.modifiedCount > 0){
                toast.success('Payment successfully!')
                navigate("/myhome/payment");
            };
        });

        
    };
    return (
        <div className="flex flex-col justify-center items-center p-48">
            <span className="text-xl"><strong>Price : </strong> 500</span>
            <Link onClick={()=>purchase(userInfo)} className="btn btn-neutral">Purchase Premium</Link>
        </div>
    );
};

export default Checkout;