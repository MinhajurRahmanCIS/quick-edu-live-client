import React, { useContext, useState } from 'react';
import ClassEnroll from '../ClassEnroll/ClassEnroll';
import EnrollmentModal from '../EnrollmentModal/EnrollmentModal';
import { AuthContext } from '../../../../contexts/AuthProvider';
import useEnrollClasses from '../../../../hooks/useEnrollClasses';

const Enroll = () => {
    const { user } = useContext(AuthContext);
    const [modal, setModal] = useState(null);
    const {enrollClasses, classLoading: enrollLoading, refetch} = useEnrollClasses(user);

    return (
        <div>
            <ClassEnroll
                setModal={setModal}
                enrollClasses={enrollClasses.data}
                enrollLoading={enrollLoading}
                refetch={refetch}
            >
            </ClassEnroll>

            {
                modal &&
                <EnrollmentModal
                    modal={modal}
                    setModal={setModal}
                    refetch={refetch}
                >

                </EnrollmentModal>
            }
        </div>
    );
};

export default Enroll;