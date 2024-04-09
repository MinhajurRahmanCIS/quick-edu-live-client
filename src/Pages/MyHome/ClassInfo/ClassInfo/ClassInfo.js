import React from 'react';
import Cover from '../Cover/Cover';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const ClassInfo = () => {
    const { id } = useParams();
    const { data: classInfo = [], isLoading, refetch } = useQuery({
        queryKey: ["ClassInfo"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/classes/${id}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });
    console.log(classInfo.data)
    return (
        <div>
            <Cover></Cover>
        </div>
    );
};

export default ClassInfo;