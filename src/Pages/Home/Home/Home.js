import React from 'react';
import Banner from '../Banner/Banner';
import Reviews from '../Reviews/Reviews';
import { Helmet } from 'react-helmet-async';
import CreateClassInfo from '../CreateClassInfo/CreateClassInfo';
import AiQuizInfo from '../AiQuizInfo/AiQuizInfo';
import AiAssignmentInfo from '../AiAssignmentInfo/AiAssignmentInfo';
import Feature from '../Feature/Feature';
import Plans from '../Plans/Plans';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>
                    Quick Edu Live
                </title>
            </Helmet>
            <Banner></Banner>
            <CreateClassInfo></CreateClassInfo>
            <Feature></Feature>
            <AiQuizInfo></AiQuizInfo>
            <AiAssignmentInfo></AiAssignmentInfo>
            <Plans></Plans>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;