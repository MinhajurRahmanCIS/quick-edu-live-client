import { useQuery } from '@tanstack/react-query';

const useClass = id => {
    const { data: classData = [], isLoading, refetch } = useQuery({
        queryKey: ["classData", id],
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
    return { classData, isLoading, refetch };
};

export default useClass;