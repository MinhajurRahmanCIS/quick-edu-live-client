import React, { useState } from 'react';
import CreateQuiz from '../CreateQuiz/CreateQuiz';
import AllQuiz from '../AllQuiz/AllQuiz';
import QuizModal from '../CreateQuiz/QuizModal';

const Quizzes = ({ id }) => {
    const [modal, setModal] = useState(null);
    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-5 p-5">
            <CreateQuiz
                id={id}
                setModal={setModal}
            >

            </CreateQuiz>
            {
                modal && <QuizModal
                    modal={modal}
                    setModal={setModal}
                >

                </QuizModal>
            }
            <AllQuiz></AllQuiz>
        </div>
    );
};

export default Quizzes;