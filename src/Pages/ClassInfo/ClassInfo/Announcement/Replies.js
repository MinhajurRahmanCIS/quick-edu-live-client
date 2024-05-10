import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../Shared/Loading/Loading';
import Reply from './Reply';

const Replies = ({ modal, user }) => {
    const { data: comments = [], isLoading, refetch } = useQuery({
        queryKey: ["comments", modal?._id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/comments?announcementId=${modal._id}&sorted=${-1}`, {
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



    console.log(comments.data)
    return (
        <div>
            {
                comments &&
                comments.data.map(c =>
                    <Reply
                        key={c._id}
                        c={c}
                        role={modal.role}
                        refetch={refetch}
                    >
                    </Reply>)
            }
        </div>
    );
};

export default Replies;