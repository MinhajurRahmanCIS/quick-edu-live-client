import React from 'react';
import Loading from '../../Shared/Loading/Loading';

const Results = ({ q, i, userResult }) => {
    const { question, options, correctAnswer } = q;
    if (!userResult) {
        return <Loading></Loading>
    }

    // Slice the userAnswer and correctAnswer to only take the first two characters
    const userAnswer = userResult.userAnswer.slice(0, 2);
    const sliceCorrectAnswer = correctAnswer.slice(0, 2);
    const isCorrect = userAnswer === sliceCorrectAnswer;

    return (
        <div className="p-5 border-black border-2 my-5">
            <div className={`text-lg text-end font-semibold my-2 
            ${isCorrect ?
                    'text-green-500'
                    :
                    'text-red-500'
                }`}>
                {
                    isCorrect ? 'Correct' : 'Incorrect'
                }
            </div>
            <h1 className="text-xl"><strong>Q.{i}</strong> {question} </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-3">
                {options.map((option, index) => {
                    let optionStyle = "flex items-center text-xl font-semibold p-5 gap-2";

                    if (option.slice(0, 2) === sliceCorrectAnswer) {
                        optionStyle += " bg-green-300"; // correct answer
                    } else if (option.slice(0, 2) === userAnswer) {
                        optionStyle += " bg-red-300"; // wrong answer
                    }

                    return (
                        <div key={index} className={optionStyle}>
                            <input
                                type="radio"
                                name={`question-${i}`}
                                value={option}
                                checked={option.slice(0, 2) === userAnswer}
                                readOnly
                                className="radio"
                            />
                            <span>{option}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Results;
