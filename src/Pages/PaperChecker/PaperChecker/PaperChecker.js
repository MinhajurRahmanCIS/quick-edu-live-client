import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import checkingIcon from "../../../assets/icon/scanning.gif";

const PaperChecker = () => {
    const [questionPreview, setQuestionPreview] = useState(null);
    const [answerPreview, setAnswerPreview] = useState(null);
    const [resultLoading, setResultLoading] = useState(false)
    const imageHostKey = process.env.REACT_APP_imgBB_key;
    const navigate = useNavigate();

    const handleQuestionImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setQuestionPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            // Handle scenario when no file is chosen
            setQuestionPreview(null);
        }
    };

    const handleAnswerImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAnswerPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            // Handle scenario when no file is chosen
            setAnswerPreview(null);
        }
    };

    const handelCheck = (event) => {
        setResultLoading(true);
        event.preventDefault();
        const form = event.target;
        // const studentName = form.name.value;
        // const studentId = form.id.value;
        // const subject = form.subject.value;
        // console.log(studentName, studentId, subject)
        const questionImage = form.questionImage.files[0];
        const answerImage = form.answerImage.files[0];
        const formData = new FormData();
        formData.append('image', questionImage);
        fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`,
            {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(imageData => {
                const questionImg = imageData.data.url;
                const formData = new FormData();
                formData.append('image', answerImage);
                fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`,
                    {
                        method: 'POST',
                        body: formData
                    })
                    .then(res => res.json())
                    .then(imageData => {
                        const answerImg = imageData.data.url;
                        const images = {
                            // studentName,
                            // studentId,
                            // subject,
                            questionImg,
                            answerImg
                        };
                        fetch("http://localhost:5000/check", {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                                authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                            },
                            body: JSON.stringify(images)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.data.insertedId) {
                                    setQuestionPreview(null)
                                    setAnswerPreview(null)
                                    setResultLoading(false);
                                    toast.success("Checking Done!")
                                    form.reset();
                                    navigate(`/myhome/papersummery/${data.data.insertedId}`);
                                }
                            })
                    });
            });
    }

    return (
        <div className="max-w-[1440px] mx-auto">
            {
                resultLoading ?
                    <div className="flex justify-center items-center h-full w-full">
                        <img src={checkingIcon} alt="" />
                    </div>
                    :
                    <>
                        <div className="navbar bg-base-300 my-4">
                            <span className="text-xl font-bold">
                                Paper Checker with Gemini Ai</span>
                        </div>
                        <form className="card-body" onSubmit={handelCheck}>
                            {/* <div className="grid grid-col-1 md:grid-cols-2 gap-5">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-xl  font-bold">Student Name</span>
                                    </label>
                                    <input name="name" type="text" placeholder="Enter Name" className="input input-bordered w-full" />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-xl font-bold">Student Id</span>
                                    </label>
                                    <input name="id" type="text" placeholder="Enter Id" className="input input-bordered w-full" />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-xl font-bold">Subject</span>
                                    </label>
                                    <input name="subject" type="text" placeholder="Subject" className="input input-bordered w-full" />
                                </div>
                            </div> */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-2xl text-center font-bold p-2 border border-black w-full">Insert Question Image</span>
                                    </label>
                                    {questionPreview && (
                                        <div className="mt-4">
                                            <img src={questionPreview} alt="Uploaded" className="w-full h-[350px]" />
                                        </div>
                                    )}
                                    <input
                                        name="questionImage"
                                        onChange={handleQuestionImageChange}
                                        type="file"
                                        accept=".png, .jpg, .jpeg"
                                        className="file-input file-input-bordered w-full my-5"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-2xl text-center font-bold p-2 border border-black w-full">Insert Answer Image</span>
                                    </label>
                                    {answerPreview && (
                                        <div className="mt-4">
                                            <img src={answerPreview} alt="Uploaded" className="w-full h-[350px]" />
                                        </div>
                                    )}
                                    <input
                                        name="answerImage"
                                        onChange={handleAnswerImageChange}
                                        type="file"
                                        accept=".png, .jpg, .jpeg"
                                        className="file-input file-input-bordered w-full my-5"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-control">
                                <input type="submit" value="Check" className="btn btn-neutral hover:bg-slate-600 text-xl font-semibold w-full" />
                            </div>
                        </form>
                    </>
            }
        </div>
    );
};

export default PaperChecker;