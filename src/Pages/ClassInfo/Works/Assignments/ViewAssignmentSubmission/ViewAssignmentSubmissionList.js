import React from 'react';
import { FaFileDownload } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';

const ViewAssignmentSubmissionList = ({ viewAssignmentSubmission, i }) => {
    const { assignmentId, userName, userEmail, userPicture, fileURL, fileName} = viewAssignmentSubmission;

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
                {fileName}
            </td>
            <td>
                <div className="tooltip" data-tip={"Download"}> 
                <a className="btn btn-neutral text-3xl" href={fileURL} target="_blank" rel="noopener noreferrer"> <FaFileDownload />
                </a>
                </div>
            </td>
        </tr>
    );
};

export default ViewAssignmentSubmissionList;
