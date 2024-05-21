import { useQuery } from '@tanstack/react-query';

const useEnrollClasses = user => {
    const { data: enrollClasses = [], isLoading: enrollLoading, refetch } = useQuery({
        queryKey: ["Enrollment Classes", user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/enrollments?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });
    return { enrollClasses, classLoading: enrollLoading, refetch };
};

export default useEnrollClasses;