import React from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Review = ({ review }) => {
    const { name, image, comment, rating, date } = review;
    const stars = [1, 2, 3, 4, 5].map((index) => {
        if (index <= rating - 0.5) {
            return <FaStar key={index} />;
        } else if (index === Math.ceil(rating)) {
            return <FaStarHalfAlt key={index} />;
        } else {
            return <FaRegStar key={index} />;
        }
    });
    return (
        <div className="card border bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex items-center gap-2">
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src={image} alt="" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold">{name}</p>
                        <p className="text-sm">{date}</p>
                    </div>
                </div>
                
                <div className="flex gap-0.5 text-xl text-[#FFD700]">
                {stars}
                </div>

                <p>{comment}</p>
            </div>
        </div>
    );
};

export default Review;