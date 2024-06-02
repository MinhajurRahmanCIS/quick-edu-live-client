import { useQuery } from '@tanstack/react-query';

const useLoadSubmission = id => {
    const { data: viewSubmissions = [], isLoading: viewSubmissionsLoading } = useQuery({
        queryKey: ["viewSubmissions", id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/viewSubmission/${id}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });
    return { viewSubmissions, viewSubmissionsLoading};
};

export default useLoadSubmission;