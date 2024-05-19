import React, { useContext, useState } from 'react';
import Classes from '../Classes/Classes';
import ClassModal from '../ClassModal/ClassModal';
import { AuthContext } from '../../../contexts/AuthProvider';
import useClasses from '../../../hooks/useClasses';
import useTeacher from '../../../hooks/useTeacher';
import Loading from '../../Shared/Loading/Loading';
import useLoadUser from '../../../hooks/useLoadUser';
import Enroll from '../ClassEnroll/Enroll/Enroll';

const MyHome = () => {
    const { user } = useContext(AuthContext);
    const { userInfo, userIsLoading } = useLoadUser(user);
    const [isTeacher, isTeacherLoading] = useTeacher(user?.email);
    const { classes, classLoading, refetch } = useClasses(user);
    const [modal, setModal] = useState(null);

    if (userIsLoading) {
        return <Loading></Loading>;
    };

    if (isTeacherLoading) {
        return <Loading></Loading>;
    };
    return (
        <div>
            {
                isTeacher ?
                    <>
                        <Classes
                            classes={classes.data}
                            classLoading={classLoading}
                            setModal={setModal}
                            refetch={refetch}
                        >
                        </Classes>
                        {
                            modal &&
                            <ClassModal
                                refetch={refetch}
                                modal={modal}
                                setModal={setModal}
                            >
                            </ClassModal>
                        }
                    </>
                    :
                    <>
                    <Enroll>
                        
                    </Enroll>
                    </>
            }

            {
                !userInfo.data?.role && "Please Select Role First"
            }

        </div>
    );
};

export default MyHome;