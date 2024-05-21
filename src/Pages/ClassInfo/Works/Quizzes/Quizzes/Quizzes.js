import React, { useContext, useState } from 'react';
import CreateQuiz from '../CreateQuiz/CreateQuiz';
import AllQuiz from '../AllQuiz/AllQuiz';
import QuizModal from '../CreateQuiz/QuizModal';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Shared/Loading/Loading';
import { useParams } from 'react-router-dom';
import useTeacher from '../../../../../hooks/useTeacher';
import { AuthContext } from '../../../../../contexts/AuthProvider';

const Quizzes = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [modal, setModal] = useState(null);
    const [isTeacher, isTeacherLoading] = useTeacher(user?.email);
    const { data: quizzes = [], isLoading, refetch } = useQuery({
        queryKey: ["quizzes", id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/classwork?classId=${id}&quizNo=true`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>;
    };

    if (isTeacherLoading) {
        return <Loading></Loading>;
    };

    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-5 p-5 mt-6">

            {
                isTeacher &&
                <>
                    <CreateQuiz
                        id={id}
                        setModal={setModal}
                    >
                    </CreateQuiz>

                    {
                        modal && <QuizModal
                            modal={modal}
                            setModal={setModal}
                            refetch={refetch}
                        >

                        </QuizModal>
                    }
                </>

            }

            {
                quizzes
                &&
                quizzes.data?.map((quiz, i) =>
                    <AllQuiz
                        key={i}
                        quiz={quiz}
                        i={i + 1}
                        refetch={refetch}
                        isTeacher={isTeacher}
                    >
                    </AllQuiz>)
            }

        </div>
    );
};

export default Quizzes;