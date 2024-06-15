import React from 'react';
import b1 from '../../../assets/banner/b1.png';
import b2 from '../../../assets/banner/b2.png';
import b3 from '../../../assets/banner/b3.png';
import b4 from '../../../assets/banner/b4.png';
import b5 from '../../../assets/banner/b5.png';
import b6 from '../../../assets/banner/b6.png';
import b7 from '../../../assets/banner/b7.png';
const Banner = () => {
    const bannerImage = [
        {
            _id: 1,
            prev: 7,
            next: 2,
            img: b1
        },
        {
            _id: 2,
            prev: 1,
            next: 3,
            img: b2
        },
        {
            _id: 3,
            prev: 2,
            next: 4,
            img: b3
        },
        {
            _id: 4,
            prev: 3,
            next: 5,
            img: b4
        },
        {
            _id: 5,
            prev: 4,
            next: 6,
            img: b5
        },
        {
            _id: 6,
            prev: 5,
            next: 7,
            img: b6
        },
        {
            _id: 7,
            prev: 6,
            next: 1,
            img: b7
        }
    ];
    return (
        <div>
            <div className="carousel h-[300px] md:h-[400px] lg:h-[600px] w-full">
                {
                    bannerImage.map(bi =>
                        <div 
                        key={bi._id}
                        id={`slide${bi._id}`} 
                        className="carousel-item relative w-full">
                            <img src={bi.img} className="w-full" alt="banner"/>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href={`#slide${bi.prev}`} className="btn btn-circle btn-neutral">❮</a>
                                <a href={`#slide${bi.next}`} className="btn btn-circle btn-neutral">❯</a>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Banner;