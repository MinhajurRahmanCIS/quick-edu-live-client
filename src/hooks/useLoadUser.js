import { useQuery } from '@tanstack/react-query';

const useLoadUser = user => {
    const { data: userInfo = [], isLoading, refetch } = useQuery({
        queryKey: ["User"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });
    return { userInfo, isLoading, refetch };
};

export default useLoadUser;