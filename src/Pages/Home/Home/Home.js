import React from 'react';
import Banner from '../Banner/Banner';
import Reviews from '../Reviews/Reviews';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>
                  Quick Edu Live
                </title>
            </Helmet>
            <Banner></Banner>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;