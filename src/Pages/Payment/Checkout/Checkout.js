import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useLoadUser from '../../../hooks/useLoadUser';
import Loading from '../../Shared/Loading/Loading';
import paper from "../../../assets/other/paper.jpg"
import { HiOutlineCurrencyBangladeshi } from 'react-icons/hi';
import { HiMiniCurrencyDollar } from 'react-icons/hi2';
import { Helmet } from 'react-helmet-async';

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const { userInfo, userIsLoading } = useLoadUser(user);
    const navigate = useNavigate();

    const [currency, setCurrency] = useState('USD');
    const [price, setPrice] = useState(10.99);

    const exchangeRate = 117.44; // Exchange rate from USD to BDT

    if (userIsLoading) {
        return <Loading />;
    }

    const handleCurrencyChange = () => {
        if (currency === 'USD') {
            setCurrency('BDT');
            setPrice(parseInt(4.26 * exchangeRate));
        } else {
            setCurrency('USD');
            setPrice(4.26);
        }
    };

    const handlePurchase = () => {
        const purchase = {
            name: userInfo?.data?.name,
            email: userInfo?.data?.email,
            currency: currency,
            amount: price,
        }

        fetch(`http://localhost:5000/payment`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
            },
            body: JSON.stringify(purchase)
        })
            .then(res => res.json())
            .then(data => {
                window.location.replace(data.url)
                console.log(data);
            });
    };


    return (
        <div className="hero min-h-screen p-5">
            <Helmet>
                <title>
                    Checkout
                </title>
            </Helmet>
            <div className="card lg:card-side bg-base-100 border rounded-none shadow-xl">
                <figure className="border-e">
                    <img className="rounded-none w-[400px]" src={paper} alt="Album" />
                </figure>
                <div className="card-body">
                    <h1 className="card-title">Unlock The Future </h1>
                    <div className="flex gap-2">
                        <h3 className="font-semibold">
                            <span className="text-5xl">{currency === 'USD' ? '$' : '৳'}{price}</span>
                        </h3>
                        <p className="font-bold">Life <br /> Time</p>
                        <div className="justify-end">
                            <button onClick={handleCurrencyChange} className="btn text-5xl">
                                {currency === 'USD' ?
                                    <div className="tooltip" data-tip="USD">
                                        <HiOutlineCurrencyBangladeshi></HiOutlineCurrencyBangladeshi>
                                    </div>
                                    :
                                    <div className="tooltip" data-tip="Taka">
                                        <HiMiniCurrencyDollar ></HiMiniCurrencyDollar>
                                    </div>
                                }

                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between my-2">
                        <div>Ai Paper Checker</div>
                        <div>{currency === 'USD' ? '$' : '৳'}{price}</div>
                    </div>
                    <hr />
                    <div className="flex justify-between my-1">
                        <div>
                            Subtotal
                            <br />
                            Tax
                        </div>
                        <div>
                            {currency === 'USD' ? '$' : '৳'}{price}
                            <br />
                            {currency === 'USD' ? '$0.00' : '৳0.00'}
                        </div>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <div>Total</div>
                        <div>{currency === 'USD' ? '$' : '৳'}{price}</div>
                    </div>
                    <p>There will be no refund! <span className="text-blue-400 link-hover hover:text-blue-600 cursor-pointer">Term and condition</span></p>
                    <div className="flex justify-between items-center">
                        <button onClick={handlePurchase} className="btn btn-neutral">Purchase</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
