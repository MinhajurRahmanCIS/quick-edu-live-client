import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateAssignment from '../CreateAssignment/CreateAssignment';
import AssignmentModal from '../CreateAssignment/AssignmentModal';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Shared/Loading/Loading';
import ViewAssignment from '../ViewAssignment/ViewAssignment';
import AllAssignment from '../AllAssignment/AllAssignment';

const Assignments = () => {
    const { id } = useParams();
    const [modal, setModal] = useState(null);
    const { data: assignments = [], isLoading, refetch } = useQuery({
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

    // console.log(assignments.data, id)

    if (isLoading) {
        return <Loading></Loading>;
    };

    

    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-5 p-5 mt-6">
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

            {
                assignments
                &&
                assignments.data?.map((assignment, i) =>
                    <AllAssignment
                        key={i}
                        assignment={assignment}
                        refetch={refetch}
                    >
                    </AllAssignment>)
            }
        </div>
    );
};

export default Assignments;