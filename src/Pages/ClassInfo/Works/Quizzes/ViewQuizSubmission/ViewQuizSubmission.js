import React from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../../Shared/Loading/Loading';
import useLoadSubmission from '../../../../../hooks/useLoadSubmission';
import ViewQuizSubmissionList from './ViewQuizSubmissionList';
import GoBackButton from '../../../../../components/GoBackButton';

const ViewQuizSubmission = () => {
    const { id } = useParams();
    const { viewSubmissions, viewSubmissionsLoading } = useLoadSubmission(id);

    if (viewSubmissionsLoading) {
        return <Loading></Loading>
    };

    return (
        <div className="max-w-[1440px] mx-auto p-1">
            <GoBackButton></GoBackButton>
            <div>
                {
                    viewSubmissions.length > 0 ?
                        <div className="p-2">
                            <div className="flex flex-col w-full">
                                <div className="divider divider-end font-semibold text-2xl">{viewSubmissions?.length} Submission </div>
                            </div>
                            <div className="overflow-x-auto border">
                                <table className="table text-center text-xl">
                                    {/* head */}
                                    <thead>
                                        <tr className="text-black text-xl">
                                            <th>No</th>
                                            <th></th>
                                            <th>Email</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            viewSubmissions &&
                                            viewSubmissions?.map((submissions, i) =>
                                                <ViewQuizSubmissionList
                                                    key={submissions._id}
                                                    submissions={submissions}
                                                    i={i}
                                                >
                                                </ViewQuizSubmissionList>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        :
                        <div className="flex justify-center items-center text-xl p-10">
                            <h1>No student is enrolled!</h1>
                        </div>
                }
            </div>
        </div>
    );
};

export default ViewQuizSubmission;