import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateAssignment from '../CreateAssignment/CreateAssignment';
import AssignmentModal from '../CreateAssignment/AssignmentModal';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Shared/Loading/Loading';
import AllAssignment from '../AllAssignment/AllAssignment';
import useTeacher from '../../../../../hooks/useTeacher';
import { AuthContext } from '../../../../../contexts/AuthProvider';

const Assignments = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [isTeacher, isTeacherLoading] = useTeacher(user?.email)
    const [modal, setModal] = useState(null);
    const { data: assignments = [], isLoading: assignmentsIsLoading, refetch } = useQuery({
        queryKey: ["assignments", id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/classwork?classId=${id}&assignmentNo=true`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    const { data: assignmentSubmissions = [], isLoading: assignmentSubmissionsLoading } = useQuery({
        queryKey: ["assignmentSubmissions", user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/checkSubmission?email=${user?.email}&assignment=true`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    if (assignmentsIsLoading || isTeacherLoading || assignmentSubmissionsLoading) {
        return <Loading></Loading>;
    };
    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-5 p-5 mt-6">

            {
                isTeacher &&
                <>
                    <CreateAssignment
                        id={id}
                        setModal={setModal}
                    >
                    </CreateAssignment>

                    {
                        modal &&
                        <AssignmentModal
                            modal={modal}
                            setModal={setModal}
                            refetch={refetch}
                        >
                        </AssignmentModal>
                    }
                </>
            }

            {
                assignments
                &&
                assignments.data?.map((assignment, i) =>
                    <AllAssignment
                        key={i}
                        assignment={assignment}
                        i={i}
                        refetch={refetch}
                        isTeacher={isTeacher}
                        assignmentSubmissions={assignmentSubmissions?.data}
                    >
                    </AllAssignment>)
            }
        </div>
    );
};

export default Assignments;