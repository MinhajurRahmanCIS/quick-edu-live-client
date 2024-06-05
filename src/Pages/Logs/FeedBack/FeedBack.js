import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import useLoadUser from '../../../hooks/useLoadUser';
import Loading from '../../Shared/Loading/Loading';
import { format } from 'date-fns';

const FeedBack = () => {
    const { user } = useContext(AuthContext);
    const { userInfo, userIsLoading } = useLoadUser(user);
    const [rating, setRating] = useState(3.5);

    const newDate = new Date();


    if (userIsLoading) {
        return <Loading></Loading>
    }

    const handleChange = (event) => {
        setRating(parseFloat(event.target.value));
    };

    const handelSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const comment = form.comment.value;

        const feedback = {
            name,
            email: userInfo?.data?.email,
            image: userInfo?.data?.image,
            role: userInfo?.data?.role, 
            rating,
            comment,
            date: format(newDate, 'dd-MMM-yyyy'),
        };

        fetch("http://localhost:5000/feedback", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
            },
            body: JSON.stringify(feedback)
        })
            .then(res => res.json())
            .then(data => {
                if (data.data.insertedId) {
                    toast.success("Thank You For Feedback")
                    form.reset();
                }
                else {
                    toast.error("Something went wrong. Try Again")
                }
            })
    };

    return (
        <div>
            <h1 className="text-3xl text-center font-bold mt-5">Give Us Feedback</h1>
            <form onSubmit={handelSubmit} className="card-body">
                <label className="input input-bordered flex items-center gap-2">
                    <strong>Name : </strong>
                    <input
                        name="name"
                        type="text"
                        className="grow"
                        defaultValue={user?.displayName}
                        disabled
                    />
                </label>

                <div className="flex items-center ms-3">
                    <h1 className="text-xl font-bold">Rating : </h1>
                    <div className="rating rating-xl rating-half">
                        <input type="radio" name="rating-10" className="rating-hidden" value="0" onChange={handleChange} />

                        <input
                            type="radio"
                            name="rating-10"
                            className="bg-[#FFD700] mask mask-star-2 mask-half-1"
                            value="0.5"
                            checked={rating === 0.5}
                            onChange={handleChange}
                        />
                        <input
                            type="radio"
                            name="rating-10"
                            className="bg-[#FFD700] mask mask-star-2 mask-half-2"
                            value="1"
                            checked={rating === 1}
                            onChange={handleChange}
                        />

                        <input
                            type="radio"
                            name="rating-10"
                            className="bg-[#FFD700] mask mask-star-2 mask-half-1"
                            value="1.5"
                            checked={rating === 1.5}
                            onChange={handleChange}
                        />
                        <input
                            type="radio"
                            name="rating-10"
                            className="bg-[#FFD700] mask mask-star-2 mask-half-2"
                            value="2"
                            checked={rating === 2}
                            onChange={handleChange}
                        />

                        <input
                            type="radio"
                            name="rating-10"
                            className="bg-[#FFD700] mask mask-star-2 mask-half-1"
                            value="2.5"
                            checked={rating === 2.5}
                            onChange={handleChange}
                        />
                        <input
                            type="radio"
                            name="rating-10"
                            className="bg-[#FFD700] mask mask-star-2 mask-half-2"
                            value="3"
                            checked={rating === 3}
                            onChange={handleChange}
                        />

                        <input
                            type="radio"
                            name="rating-10"
                            className="bg-[#FFD700] mask mask-star-2 mask-half-1"
                            value="3.5"
                            checked={rating === 3.5}
                            onChange={handleChange}
                        />
                        <input
                            type="radio"
                            name="rating-10"
                            className="bg-[#FFD700] mask mask-star-2 mask-half-2"
                            value="4"
                            checked={rating === 4}
                            onChange={handleChange}
                        />

                        <input
                            type="radio"
                            name="rating-10"
                            className="bg-[#FFD700] mask mask-star-2 mask-half-1"
                            value="4.5"
                            checked={rating === 4.5}
                            onChange={handleChange}
                        />
                        <input
                            type="radio"
                            name="rating-10"
                            className="bg-[#FFD700] mask mask-star-2 mask-half-2"
                            value="5"
                            checked={rating === 5}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <label className="textarea textarea-bordered textarea-lg">
                    <strong>Comment : </strong>
                    <textarea
                        name="comment"
                        placeholder="Tell Us Your Experience "
                        className="textarea textarea-lg w-full mt-1"
                        required
                    ></textarea>
                </label>

                <input className="btn btn-neutral text-xl my-2" type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default FeedBack;