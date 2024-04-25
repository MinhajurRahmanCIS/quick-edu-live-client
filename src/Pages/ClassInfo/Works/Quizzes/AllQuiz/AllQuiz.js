import React from 'react';
import { FaRegEye } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const AllQuiz = ({ quiz }) => {
    const { _id, topic, quizNo, questions, date, examDuration, level } = quiz;
    return (
        <div className="card bg-base-100 shadow-md rounded-none hover:shadow-xl border-2">
            <Link to="">
                <div className="flex justify-center items-center">
                    <div className="avatar placeholder cursor-pointer mt-3">
                        <div className="bg-neutral text-neutral-content rounded-full w-32 border-10 border-red-600 hover:shadow-2xl">
                            <span className="text-4xl font-bold">{topic[0]}</span>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="card-body text-md">
                <h2><strong>Topic : </strong> {topic} </h2>
                <p><strong>Quiz No : </strong> {quizNo}</p>
                <p><strong>Date : </strong>{date}</p>
                <p><strong>Duration : </strong>{examDuration}</p>
                <p><strong>Total Question : </strong>{questions.length}</p>
                <p><strong>Difficulty Level : </strong>{level}</p>
                <div className="card-actions justify-end gap-3">
                    <Link to={`/myhome/classinfo/viewQuizzes/${_id}`} className="text-3xl hover:bg-slate-400 tooltip" data-tip={"View Question"}><FaRegEye></FaRegEye></Link>
                </div>
            </div>
        </div>
    );
};

export default AllQuiz;