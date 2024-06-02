import React from 'react';
import { Link } from 'react-router-dom';

const ViewQuizSubmissionList = ({ submissions, i }) => {
    const { quizId, userName, userEmail, userPicture, results } = submissions;
    const totalCorrect = results?.filter(result => result.isCorrect).length || 0;
    const totalQuestions = results?.length || 0;

    return (
        <tr className="hover">
            <th>
                {i + 1}
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={userPicture} alt='' />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{userName}</div>
                    </div>
                </div>
            </td>
            <td>
                {userEmail}
            </td>
            <td>
             {totalCorrect} out of {totalQuestions}
            </td>
            <td>
                <Link to={`/result/${quizId}/${userEmail}`} className="btn btn-neutral btn-wide text-xl font-bold hover:bg-slate-500">Result</Link>
            </td>
        </tr>
    );
};

export default ViewQuizSubmissionList;