import React from 'react';
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllQuiz = ({ quiz, i, refetch }) => {
    const { _id, topic, quizNo, questions, date, examDuration, level } = quiz;


    const handelDeleteQuiz = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this Quiz!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete Quiz"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/classwork/${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Quiz Deleted!",
                                text: "Your Quiz has been deleted.",
                                icon: "success"
                            });
                        }
                        else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong! Please Try Again"
                            });
                        }
                    })
            };
        });
    };
    return (
        <div className="card bg-base-100 shadow-md rounded-none hover:shadow-xl border-2">
            <Link to={`/myhome/viewQuizzes/${_id}`}>
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
                <p><strong>Quiz No : </strong> {i}</p>
                <p><strong>Date : </strong>{date}</p>
                <p><strong>Duration : </strong>{examDuration}</p>
                <p><strong>Total Question : </strong>{questions.length}</p>
                <p><strong>Difficulty Level : </strong>{level}</p>
                <div className="card-actions justify-end gap-3">
                    <Link to={`/myhome/viewQuizzes/${_id}`} className="text-3xl hover:bg-slate-400 tooltip" data-tip={"View Question"}><FaRegEye></FaRegEye></Link>

                    <div onClick={() => handelDeleteQuiz(_id)} className="text-3xl hover:bg-slate-400 tooltip" data-tip={"Delete Quiz"}><RiDeleteBin6Line></RiDeleteBin6Line></div>
                </div>
            </div>
        </div>
    );
};

export default AllQuiz;