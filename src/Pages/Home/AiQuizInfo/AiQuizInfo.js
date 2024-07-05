import React from 'react';
// import aiQuiz from '../../../assets/video/Ai_Quiz.mp4';

const AiQuizInfo = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-10 items-center">
                {/* <div className="flex justify-center">
                    <video className="lg:w-full xl:w-4/5 border" height="auto" autoPlay muted loop>
                        <source src={aiQuiz} type="video/mp4" />
                        Your browser does not support the video. Please Use Another One.
                    </video>
                </div> */}
                <div>
                    <h1 className="sm:text-2xl md:text-xl lg:text-2xl xl:text-5xl font-bold">AI Quiz Generator: Elevate Your Learning Experience</h1>
                    <p className="md:text-xs lg:text-sm xl:text-xl mt-4 text-justify">
                    Introducing the AI Quiz Generator, an innovative tool powered by the Gemini-1.5-Flash API. With Quick Edu Live, you can effortlessly create engaging quizzes tailored to your educational needs. Our advanced AI technology ensures the generation of diverse, challenging and informative questions to enhance learning and assessment. Whether for classrooms, training programs, or self-study, our AI Quiz Generator provides a seamless and efficient way to test knowledge and track progress. Additionally, it supports printing questions for both online and offline exams, offering maximum flexibility in how you conduct your assessments.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AiQuizInfo;
