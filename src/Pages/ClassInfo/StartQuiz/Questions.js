import React from 'react';

const Questions = ({ q, i, register }) => {
    const { question, options, correctAnswer } = q;
    return (
        <div className="p-5 border-black border-2 my-5">
        <h1 className="text-xl"><strong>Q.{i}</strong> {q.question} </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-3">
            {
                q.options.map((option, index) =>
                    <div key={index}
                        className="flex items-center text-xl font-semibold p-5 gap-2">
                        <input {...register(`question-${i}`)}
                            type="radio" 
                            name={`question-${i}`} // unique name for each question
                            value={option}
                            className="radio hover:bg-slate-400 hover:text-black" 
                        />
                        <span>
                            {option}
                        </span>
                    </div>
                )
            }
        </div>
    </div>
    );
};

export default Questions;