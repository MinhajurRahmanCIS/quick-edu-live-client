import { useQuery } from '@tanstack/react-query';

const useClasses = user => {
    const { data: classes = [], isLoading, refetch } = useQuery({
        queryKey: ["classes", user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/classes?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });
    return { classes, classLoading:isLoading, refetch };
};

export default useClasses;