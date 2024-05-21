import React, { useState } from 'react';
import ClassEnroll from '../ClassEnroll/ClassEnroll';
import EnrollmentModal from '../EnrollmentModal/EnrollmentModal';

const Enroll = () => {
    const [modal, setModal] = useState(null);
    return (
        <div>
            <ClassEnroll
                setModal={setModal}

            >
            </ClassEnroll>

            {
                modal &&
                <EnrollmentModal
                    modal={modal}
                    setModal={setModal}
                >

                </EnrollmentModal>
            }
        </div>
    );
};

export default Enroll;