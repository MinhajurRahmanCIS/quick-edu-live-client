import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import PeopleList from './PeopleList';
const ClassPeople = () => {
    const { id } = useParams();
    const { data: peoples = [], isLoading, refetch } = useQuery({
        queryKey: ["peoples", id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/enrollmentPeople?classId=${id}`, {
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

    return (
        <div>
            {
                peoples?.data?.length > 0 ?
                    <>
                        <div className="flex flex-col w-full">
                            <div className="divider divider-end font-semibold">{peoples?.data.length} Students </div>
                        </div>
                        <div className="overflow-x-auto border">
                            <table className="table text-center text-xl">
                                {/* head */}
                                <thead>
                                    <tr className="text-black text-xl">
                                        <th>No</th>
                                        <th></th>
                                        <th>Email</th>
                                        <th>Action</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        peoples &&
                                        peoples?.data.map((people, i) =>
                                            <PeopleList
                                                key={people._id}
                                                people={people}
                                                i={i}
                                                refetch={refetch}
                                            >
                                            </PeopleList>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                    :
                    <div className="flex justify-center items-center text-xl p-10">
                        <h1>No student is enrolled!</h1>
                    </div>
            }
        </div>
    );
};

export default ClassPeople;