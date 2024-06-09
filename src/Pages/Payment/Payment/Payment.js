import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import { FaPrint } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';

const Payment = () => {
    const { email, transactionId } = useParams();
    const printRef = useRef();

    const handelPrint = useReactToPrint({
        content: () => printRef.current
    });

    const { data: payment = [], isLoading: paymentIsLoading } = useQuery({
        queryKey: ["payment"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/payment/info/${email}/${transactionId}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    if (paymentIsLoading) {
        return <Loading></Loading>
    };

    const { name, service, amount, transactionId: transaction, paid } = payment;
   
   if(!payment._id){
    return <div>Nothing Here</div>
   }

    return (
        <div className="p-10">
            <div className="flex justify-end my-5">
                <button onClick={handelPrint} className="hover:bg-slate-200 text-5xl"><FaPrint></FaPrint></button>
            </div>
            <div ref={printRef}>
                <h1 className="text-center text-5xl font-bold my-3">Payment History</h1>
                <p className="text-center my-2">Quick Edu Live</p>
            <div className="overflow-x-auto border">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Service</th>
                            <th>Transaction Id</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                                1
                            </th>
                            <td>
                                <div className="flex items-center justify-center gap-3">
                                    {name}
                                </div>
                            </td>
                            <td>{service}</td>
                            <td>
                                {transaction}
                            </td>
                            <td>
                                {amount}
                            </td>
                            <td>
                                {
                                    paid ?
                                        <button className="btn btn-success ">Paid</button>
                                        :
                                        <button className="btn btn-error ">Remaining</button>}
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
};

export default Payment;