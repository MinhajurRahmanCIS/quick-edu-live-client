import React from 'react';

const ViewAssignmentQuestions = ({q, i}) => {
    const { question } = q;
    return (
        <div className="p-2">
            <h3 className="text-xl my-3"><strong>Q.{i}</strong> {question}</h3>
        </div>
    );
};

export default ViewAssignmentQuestions;