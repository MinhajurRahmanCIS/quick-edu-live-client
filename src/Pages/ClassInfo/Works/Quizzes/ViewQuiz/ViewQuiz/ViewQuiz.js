import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../../../Shared/Loading/Loading';

const ViewQuiz = () => {
    const {id} = useParams();
    const { data: viewQuiz = [], isLoading, refetch } = useQuery({
        queryKey: ["viewQuiz", id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/classwork/${id}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    if(isLoading){
        return <Loading></Loading>
    };
    console.log(viewQuiz.data)
    return (
        <div>
            View Quiz {id}
        </div>
    );
};

export default ViewQuiz;