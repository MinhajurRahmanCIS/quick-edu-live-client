import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../../Layout/HomeLayout";
import Home from "../../Pages/Home/Home/Home";
import Signup from "../../Pages/Signup/Signup";
import Login from "../../Pages/Login/Login";

const router = createBrowserRouter([
    //Home Directory
    {
        path: '/',
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
        ]
    },

])

export default router;