import React from 'react';
import Banner from '../Banner/Banner';
import Reviews from '../Reviews/Reviews';
import { Helmet } from 'react-helmet-async';
import CreateClassInfo from '../CreateClassInfo/CreateClassInfo';
import AiQuizInfo from '../AiQuizInfo/AiQuizInfo';
import AiAssignmentInfo from '../AiAssignmentInfo/AiAssignmentInfo';

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
            <AiQuizInfo></AiQuizInfo>
            <AiAssignmentInfo></AiAssignmentInfo>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;