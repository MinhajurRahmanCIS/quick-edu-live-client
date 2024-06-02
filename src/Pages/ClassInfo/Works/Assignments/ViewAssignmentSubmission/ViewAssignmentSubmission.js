import React from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../../Shared/Loading/Loading';
import GoBackButton from '../../../../../components/GoBackButton';
import { useQuery } from '@tanstack/react-query';
import ViewAssignmentSubmissionList from './ViewAssignmentSubmissionList';

const ViewAssignmentSubmission = () => {
    const { id } = useParams();
    const { data: viewAssignmentSubmissions = [], isLoading: viewAssignmentSubmissionsLoading } = useQuery({
        queryKey: ["viewSubmissions", id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/viewAssignmentSubmission/${id}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    if (viewAssignmentSubmissionsLoading) {
        return <Loading></Loading>
    };
    return (
        <div className="max-w-[1440px] mx-auto p-1">
            <GoBackButton></GoBackButton>
            <div>
                {
                    viewAssignmentSubmissions?.data?.length > 0 ?
                        <div className="p-2">
                            <div className="flex flex-col w-full">
                                <div className="divider divider-end font-semibold text-2xl">{viewAssignmentSubmissions?.data?.length} Submission </div>
                            </div>
                            <div className="overflow-x-auto border">
                                <table className="table text-center text-xl">
                                    {/* head */}
                                    <thead>
                                        <tr className="text-black text-xl">
                                            <th>No of Students</th>
                                            <th>Profile</th>
                                            <th>Email</th>
                                            <th>File Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            viewAssignmentSubmissions?.data &&
                                            viewAssignmentSubmissions?.data?.map((viewAssignmentSubmission, i) =>
                                                <ViewAssignmentSubmissionList
                                                    key={viewAssignmentSubmission._id}
                                                    viewAssignmentSubmission={viewAssignmentSubmission}
                                                    i={i}
                                                >
                                                </ViewAssignmentSubmissionList>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        :
                        <div className="flex justify-center items-center text-xl p-10">
                            <h1>No Submission</h1>
                        </div>
                }
            </div>
        </div>
    );
};

export default ViewAssignmentSubmission;