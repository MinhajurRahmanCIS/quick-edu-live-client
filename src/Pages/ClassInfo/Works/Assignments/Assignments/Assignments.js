import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateAssignment from '../CreateAssignment/CreateAssignment';
import AssignmentModal from '../CreateAssignment/AssignmentModal';

const Assignments = () => {
    const { id } = useParams();
    const [modal, setModal] = useState(null);
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
                >
                </AssignmentModal>
            }
        </div>
    );
};

export default Assignments;