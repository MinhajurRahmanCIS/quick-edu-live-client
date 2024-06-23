import React from 'react';
import aiAssignment from '../../../assets/video/Ai_Assignment.mp4';

const AiAssignmentInfo = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-10 items-center">
                <div>
                    <h1 className="sm:text-2xl md:text-xl lg:text-2xl xl:text-5xl font-bold">AI Assignment Generator: Streamline Your Exam Preparation</h1>
                    <p className="md:text-xs lg:text-sm xl:text-xl mt-4 text-justify">
                    Discover the AI Assignment Generator, an advanced tool powered by the Gemini-1.5-Flash API, designed to simplify and enhance your assignment creation process. Quick Edu Live allows you to generate high-quality assignments that cater to both online and offline exams. Whether you need questions for a digital test or printed for a traditional exam setting, our AI technology ensures the delivery of diverse, challenging and relevant questions. Perfect for educators, trainers and students, the AI Assignment Generator is your go-to solution for efficient and effective exam preparation.
               
                    </p>
                </div>
                <div className="flex justify-center">
                    <video className="lg:w-full xl:w-4/5 border" height="auto" autoPlay muted loop>
                        <source src={aiAssignment} type="video/mp4" />
                        Your browser does not support the video. Please Use Another One.
                    </video>
                </div>
            </div>
        </div>
    );
};

export default AiAssignmentInfo;
