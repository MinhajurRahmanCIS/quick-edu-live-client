import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import PeopleList from './PeopleList';
import { AuthContext } from '../../../contexts/AuthProvider';
import useTeacher from '../../../hooks/useTeacher';
const ClassPeople = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [isTeacher, isTeacherLoading] = useTeacher(user?.email)
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

    if (isTeacherLoading) {
        return <Loading></Loading>
    };

    return (
        <>
            {
                peoples?.data?.length > 0 ?
                    <div className="p-2">
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
                                        {
                                        isTeacher &&
                                            <th>Action</th>
                                        }
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
                                                isTeacher={isTeacher}
                                            >
                                            </PeopleList>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <div className="flex justify-center items-center text-xl p-10">
                        <h1>No student is enrolled!</h1>
                    </div>
            }
        </>
    );
};

export default ClassPeople;