import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../../../Shared/Loading/Loading';
import { IoArrowUndoOutline } from "react-icons/io5";
import { FaPrint, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ViewQuestion from '../ViewQuestion/ViewQuestion';
import { useReactToPrint } from "react-to-print";
import "./print.css";

const ViewQuiz = () => {
    const { id } = useParams();
    const printRef = useRef();
    const [showAnswer, setShowAnswer] = useState(false);
    const { data: viewQuiz = [], isLoading } = useQuery({
        queryKey: ["viewQuiz", id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/classwork/${id}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    const handelPrint = useReactToPrint({
        content: () => printRef.current
    });

    if (isLoading) {
        return <Loading></Loading>
    };

    const { quizNo, topic, date, examDuration, questions} = viewQuiz.data;

    const handleClick = () => {
        setShowAnswer(!showAnswer);
    };

    return (
        <div className="max-w-[1440px] mx-auto my-3 p-2 print-container" >
            <Link to={-1} className="btn btn-neutral rounded-none hover:bg-slate-500 text-xl"> <IoArrowUndoOutline></IoArrowUndoOutline> Go Back</Link>

            <div onClick={handleClick} className="text-end">

                {
                    showAnswer ?
                        <button className="btn btn-error"><FaRegEyeSlash></FaRegEyeSlash> Hide Answer</button>
                        :
                        <button className="btn btn-success"><FaRegEye></FaRegEye> Show Answer </button>
                }
            </div>
            <div className="flex justify-end mt-3 items-center">
                <h1 onClick={handelPrint} className="text-4xl cursor-pointer btn btn-outline btn-info tooltip tooltip-left p-1" data-tip="Print Question"><FaPrint></FaPrint></h1>
            </div>

            <div className="print-container" ref={printRef}>
                <div className="text-center text-xl my-3">
                    <h1><strong>Quiz No : </strong>{quizNo}</h1>
                    <h1><strong>Topic : </strong>{topic}</h1>
                    <p><strong>Total Question : </strong>{questions.length}</p>
                    <p><strong>Date : </strong>{date}</p>
                    <p><strong>Duration : </strong>{examDuration}</p>
                    <p><strong>Marks : </strong>{questions.length}</p>
                </div>
                <div className="text-xl ms-1">
                    <p><strong>Name : </strong></p>
                    <p><strong>Id : </strong></p>
                </div>
                <div className="my-5 border">
                    {
                        questions.map((q, i) =>
                            <ViewQuestion
                                key={q._id}
                                i={i + 1}
                                q={q}
                                showAnswer={showAnswer}
                            >
                            </ViewQuestion>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ViewQuiz;