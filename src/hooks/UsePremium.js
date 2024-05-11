import { useEffect, useState } from "react"

const usePremium = email => {
    const [isPremium, setIsPremium] = useState(false);
    const [isPremiumLoading, setIsPremiumLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/premium/${email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log("Premium", data.data);
                    setIsPremium(data.data.isPremium);
                    setIsPremiumLoading(false);
                })
        }
    }, [email])
    return [isPremium, isPremiumLoading];
}

export default usePremium;