import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import useLoadUser from '../../../hooks/useLoadUser';
import { AuthContext } from '../../../contexts/AuthProvider';
import Questions from './Questions';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const StartQuiz = () => {
    const { examId } = useParams();
    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    const [timeLeft, setTimeLeft] = useState(null);
    const navigate = useNavigate();
    const { userInfo, userIsLoading } = useLoadUser(user);

    const { data: startQuiz = {}, isLoading } = useQuery({
        queryKey: ["startQuiz", examId],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/classwork/${examId}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    useEffect(() => {
        if (startQuiz.data?.examDuration) {
            const durationInMinutes = parseInt(startQuiz.data.examDuration.slice(0, 2));
            setTimeLeft(durationInMinutes * 60); // Convert minutes to seconds
        }
    }, [startQuiz]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleSubmit(handleSubmitAnswer)();
        } else if (timeLeft === 300) {
            toast("Only 5 minutes remaining!", {
                icon: "⚠️",
            });
        }

        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleSubmit, timeLeft]);

    if (isLoading || userIsLoading) {
        return <Loading />;
    }

    const handleSubmitAnswer = (data) => {
        console.log(data);

        toast.success("Quiz Submitted")
        navigate(`/myhome/classinfo/${classId}`)
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const { classId, topic, date, examDuration, questions } = startQuiz?.data;

    return (
        <div className="max-w-[1440px] mx-auto">
            <div>
                <div className="text-center text-xl my-3">
                    <h1><strong>Topic : </strong>{topic}</h1>
                    <p><strong>Total Question : </strong>{questions?.length || 0}</p>
                    <p><strong>Date : </strong>{date}</p>
                    <p><strong>Duration : </strong>{examDuration}</p>
                    <p><strong>Marks : </strong>{questions?.length || 0}</p>
                </div>
                <div className="text-xl ms-1">
                    <p><strong>Best of luck </strong> {userInfo?.data?.name}</p>
                </div>
                <div className="my-5">
                    <div className="text-end text-2xl font-bold sticky top-0">
                        <span className="border p-2 bg-slate-400">Time Left: {formatTime(timeLeft)}</span>
                    </div>

                    <form onSubmit={handleSubmit(handleSubmitAnswer)}>
                        {
                            questions.map((q, i) =>
                                <Questions
                                    key={q._id}
                                    i={i + 1}
                                    q={q}
                                    register={register}
                                >
                                </Questions>)
                        }
                        <input className="btn btn-neutral w-full my-5" type="submit" value="Submit" />
                    </form>
                    <Toaster />
                </div>
            </div>
        </div>
    );
};

export default StartQuiz;
