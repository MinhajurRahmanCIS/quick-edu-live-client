import { useEffect, useState } from "react"

const useTeacher = email => {
    const [isTeacher, setIsTeacher] = useState(false);
    const [isTeacherLoading, setIsTeacherLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/teacher/${email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log("Teacher", data.data);
                    setIsTeacher(data.data.isTeacher);
                    setIsTeacherLoading(false);
                })
        }
    }, [email])
    return [isTeacher, isTeacherLoading]
};

export default useTeacher;