import { useEffect, useState } from "react";

const useToken = email => {
    const [token, setToken] = useState("");
    useEffect(() => {
        if (email) {
            // console.log(email)
            fetch(`http://localhost:5000/jwt?email=${email}`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data.data.accessToken)
                    if (data.data.accessToken) {
                        localStorage.setItem("quickEdu-token", data.data.accessToken);
                        setToken(data.data.accessToken);
                    }
                });
        }
    }, [email]);
    return [token];
}

export default useToken;