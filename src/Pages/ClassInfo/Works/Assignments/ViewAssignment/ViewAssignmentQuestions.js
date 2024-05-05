import React from 'react';

const ViewAssignmentQuestions = ({q, i, showAnswer}) => {
    const { question, correctAnswer } = q;
    return (
        <div className="p-2">
            <h3 className="text-2xl my-3"><strong>Q.{i}</strong> {question}</h3>
            {
                showAnswer ? <p className="text-xl"><strong>Answer :</strong> <span className="font-semibold">{correctAnswer}</span> </p> : ""
            }
        </div>
    );
};

export default ViewAssignmentQuestions;