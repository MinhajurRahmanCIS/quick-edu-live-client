import React from 'react';
import AllAnnouncement from './AllAnnouncement';
import CreateAnnouncement from './CreateAnnouncement';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';

const Announcement = ({ classData, user }) => {
    const { data: announcements = [], isLoading, refetch } = useQuery({
        queryKey: ["announcements", classData?._id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/announcements?classId=${classData?._id}&sorted=${-1}`, {
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
            <CreateAnnouncement
                classData={classData}
                user={user}
                refetch={refetch}
            >
            </CreateAnnouncement>
            <div className="grid grid-cols-1 gap-5 p-5">
                {
                    announcements.data &&
                    announcements?.data.map(announcement =>
                        <AllAnnouncement
                            key={announcement._id}
                            announcement={announcement}
                        >
                        </AllAnnouncement>)
                }

            </div>
        </div>
    );
};

export default Announcement;