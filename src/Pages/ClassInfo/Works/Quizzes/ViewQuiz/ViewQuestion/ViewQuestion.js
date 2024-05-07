import React from 'react';

const ViewQuestion = ({ q, i, showAnswer }) => {
    const { question, options, correctAnswer } = q;
    return (
        <div className="p-3">
            <h1 className="text-xl"><strong>Q.{i}</strong> {question} </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-3">
                {
                    options.map((option, i) =>
                        <div key={i}
                            className="flex items-center border text-xl font-semibold hover:bg-slate-600 hover:text-white p-5 gap-2">
                            <input type="radio" name="radio-6" className="radio" />
                            <span
                                
                                option={option}>
                                {option}
                            </span>
                        </div>
                    )
                }
            </div>
            {
                showAnswer ? <p className="text-xl">Correct Answer : <strong>{correctAnswer}</strong></p> : ""
            }

        </div>
    );
};

export default ViewQuestion;