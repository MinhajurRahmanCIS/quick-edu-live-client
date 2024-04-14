import React, { useState } from 'react';
import { SiGooglebard } from "react-icons/si";
const QuizModal = () => {
    const currentUTC = new Date();
    currentUTC.setHours(currentUTC.getHours() + 6);
    const currentDate = currentUTC.toISOString().slice(0, 16);

    // State for start time and end time
    const [startTime, setStartTime] = useState(currentDate);
    const [endTime, setEndTime] = useState(currentDate);

    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
        // Ensure end time is not earlier than start time
        if (e.target.value > endTime) {
            setEndTime(e.target.value);
        }
    };

    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
        // Ensure end time is not earlier than start time
        if (e.target.value < startTime) {
            setStartTime(e.target.value);
        }
    };
    return (
        <div>
            {/* The button to open modal */}
            <input type="checkbox" id="quiz-modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box ">
                    <label htmlFor="quiz-modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl font-bold">X</label>
                    <form className="card-body">
                        <h1 className="text-2xl font-semibold">Generate Quiz with Gemini <SiGooglebard className="text-sky-600 mt-1"></SiGooglebard></h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Quiz Subject</span>
                            </label>
                            <input type="text" placeholder="Example: Math101" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Quiz No</span>
                            </label>
                            <input type="number" placeholder="Example: 1/2" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Quiz Date</span>
                            </label>
                            <input
                                type="datetime-local"
                                id="startTime"
                                className="input input-bordered"
                                value={startTime}
                                min={currentDate}
                                onChange={handleStartTimeChange}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Quiz Time</span>
                            </label>
                            <div className="flex gap-1">
                                <input type="number" placeholder="10 M / 1 H / 1.30 HM" className="input input-bordered" />
                                <select className="select select-bordered w-full max-w-xs">
                                    <option disabled selected>Select</option>
                                    <option>Minutes</option>
                                    <option>Hour</option>
                                    <option>Hour+Minutes</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">How Many Question</span>
                            </label>
                            <input type="number" placeholder="Example: 1/2" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Quiz Level</span>
                            </label>
                            <div className='flex items-center'>
                                <input type="radio" name="level" value='Easy' className="radio radio-info" />
                                <span className='mx-3'>Easy</span>
                                <input type="radio" name="level" value='Medium' className="radio radio-warning" />
                                <span className='mx-3'>Medium</span>
                                <input type="radio" name="level" value='Hard' className="radio radio-error" />
                                <span className='mx-3'>Hard</span>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Quiz Description</span>
                            </label>
                            <textarea placeholder="Describe Properly Course Name. Example: Algebra" className="textarea textarea-bordered textarea-lg w-full" ></textarea>
                        </div>

                        <input className="btn btn-neutral mt-3 text-2xl" type="submit" value="Generate Quiz" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuizModal;