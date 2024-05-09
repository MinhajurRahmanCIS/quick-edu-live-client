import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import Paper from './Paper';

const AllPaper = () => {
    const { data: allPaper = [], isLoading, refetch } = useQuery({
        queryKey: ["All Paper"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/check`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    };
    console.log(allPaper)
    return (
        <div className="card-body grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-1 gap-3 gap-y-10">
            {
                
                allPaper &&
                allPaper.data?.map((ap, i) => 
                    <Paper 
                    key={ap._id}
                    i={i}
                    ap={ap}
                    refetch={refetch}
                    >
                    </Paper>)
            }
        </div>
    );
};

export default AllPaper;