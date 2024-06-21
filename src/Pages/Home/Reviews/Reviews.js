import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import Review from './Review';

const Reviews = () => {
    const { data: reviews = [], isLoading: reviewIsLoading } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/feedback', {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    if (reviewIsLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="my-10 p-20">
            <h1 className="text-5xl font-semibold text-center mb-8">Reviews</h1> 
            <div className="grid grid-col-1 md:grid-cols-3 gap-5">
                {
                    reviews &&
                    reviews?.data?.slice(0, 3).map((review, i) =>
                        <Review
                            key={review._id}
                            review={review}
                            i={i}
                        >
                        </Review>)
                }
            </div>

        </div>
    );
};

export default Reviews;