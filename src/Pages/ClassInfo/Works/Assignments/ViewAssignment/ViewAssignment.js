import React, { useContext, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Loading from '../../../../Shared/Loading/Loading';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ViewAssignmentQuestions from './ViewAssignmentQuestions';
import { FaPrint, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { IoArrowUndoOutline } from 'react-icons/io5';
import { AuthContext } from '../../../../../contexts/AuthProvider';
import useTeacher from '../../../../../hooks/useTeacher';
import AssignmentSubmission from './AssignmentSubmission';
import GoBackButton from '../../../../../components/GoBackButton';

const ViewAssignment = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [isTeacher, isTeacherLoading] = useTeacher(user?.email)
    const printRef = useRef();
    const [showAnswer, setShowAnswer] = useState(false);
    const { data: viewAssignment = [], isLoading } = useQuery({
        queryKey: ["viewAssignment", id],
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

    const handleClick = () => {
        setShowAnswer(!showAnswer);
    };

    if (isTeacherLoading) {
        return <Loading></Loading>;
    };

    const { assignmentNo, topic, date, scenario, questions } = viewAssignment.data;
    return (
        <div className="max-w-[1440px] mx-auto my-3 p-2 print-container" >
            <GoBackButton></GoBackButton>
            {
                isTeacher &&
                <>

                    <div className="flex justify-end items-center">
                        <h1 onClick={handelPrint} className="text-4xl cursor-pointer btn btn-outline btn-info tooltip tooltip-left p-1" data-tip="Print Question"><FaPrint></FaPrint></h1>
                    </div>

                    <div onClick={handleClick} className="text-end mt-3">
                        {
                            showAnswer ?
                                <button className="btn btn-error"><FaRegEyeSlash></FaRegEyeSlash> Hide Answer</button>
                                :
                                <button className="btn btn-success"><FaRegEye></FaRegEye> Show Answer </button>
                        }
                    </div>
                </>
            }

            <div className="print-container p-2" ref={printRef}>
                <div className="text-center text-xl my-3">
                    <h1><strong>Assignment No : </strong>{assignmentNo}</h1>
                    <h1><strong>Topic : </strong>{topic}</h1>
                    <p><strong>Total Question : </strong>{questions.length}</p>
                    <p><strong>Date : </strong>{date}</p>
                </div>

                {
                    isTeacher &&
                    <div className="text-xl ms-1">
                        <p><strong>Name : </strong></p>
                        <p><strong>Id : </strong></p>
                    </div>
                }

                <div className="my-5 border p-2">
                    <h1 className="text-2xl text-justify my-3"><strong>Scenario : </strong> {scenario} </h1>
                    {
                        questions.map((q, i) =>
                            <ViewAssignmentQuestions
                                key={q._id}
                                i={i + 1}
                                q={q}
                                showAnswer={showAnswer}
                            >
                            </ViewAssignmentQuestions>)
                    }
                </div>
                {
                    !isTeacher &&
                    <AssignmentSubmission></AssignmentSubmission>
                }

            </div>
        </div>
    );
};

export default ViewAssignment;