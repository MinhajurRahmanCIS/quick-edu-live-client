import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { IoArrowUndoOutline } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import Results from './Results';
import GoBackButton from '../../../components/GoBackButton';

const QuizResult = () => {
    const { id, userEmail } = useParams();
    const { data: quizQuestion, isLoading: quizQuestionIsLoading } = useQuery({
        queryKey: ["quizQuestion", id],
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

    const { data: quizResult, isLoading: quizResultIsLoading } = useQuery({
        queryKey: ["quizResult", userEmail],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/submission?email=${userEmail}&qId=${id}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    if (quizQuestionIsLoading || quizResultIsLoading) {
        return <Loading></Loading>
    }

    const { classId, topic, date, examDuration, questions } = quizQuestion?.data;

    // Calculate total correct answers
    const totalCorrect = quizResult?.data?.results?.filter(result => result.isCorrect).length || 0;
    const totalQuestions = questions?.length || 0;
    const totalIncorrect = totalQuestions - totalCorrect;

    return (
        <div className="max-w-[1440px] mx-auto p-1">
            <GoBackButton></GoBackButton>
            <div className="max-w-[1440px] mx-auto p-1">
                <div className="text-center text-xl my-3">
                    <h1><strong>Topic : </strong>{topic}</h1>
                    <p><strong>Total Questions : </strong>{totalQuestions}</p>
                    <p><strong>Date : </strong>{date}</p>
                    <p><strong>Duration : </strong>{examDuration}</p>
                    <p><strong>Marks : </strong>{totalQuestions}</p>
                    <div className="text-start">
                        <p><strong>Total Marks Obtained : </strong>{totalCorrect} out of {totalQuestions}</p>
                        <p><strong>Total Correct Answers : </strong>{totalCorrect}</p>
                        <p><strong>Total Incorrect : </strong>{totalIncorrect}</p>
                    </div>
                </div>
                <div className="my-5">
                    <div className="text-end text-2xl font-bold sticky top-0"></div>
                    {questions.map((q, i) => {
                        const userResult = quizResult?.data?.results?.find(result => result.questionId === q._id);
                        return (
                            <Results
                                key={q._id}
                                i={i + 1}
                                q={q}
                                userResult={userResult}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuizResult;