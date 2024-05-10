import React, { useContext, useState } from 'react';
import Classes from '../Classes/Classes';
import ClassModal from '../ClassModal/ClassModal';
import { AuthContext } from '../../../contexts/AuthProvider';
import useClasses from '../../../hooks/useClasses';

const MyHome = () => {
    const { user } = useContext(AuthContext);
    const {classes, isLoading, refetch} = useClasses(user);
    const [modal, setModal] = useState(null);
    return (
        <div>
            <Classes
                classes={classes.data}
                classLoading={isLoading}
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

        </div>
    );
};

export default MyHome;