import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../../Layout/HomeLayout";
import Home from "../../Pages/Home/Home/Home";
import Signup from "../../Pages/Signup/Signup";
import Login from "../../Pages/Login/Login";
import MyHome from "../../Pages/MyHome/MyHome/MyHome";
import Main from "../../Layout/Main";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Profile from "../../Pages/Profile/Profile";
import ClassLayout from "../../Layout/ClassLayout";
import ClassInfo from "../../Pages/ClassInfo/ClassInfo/ClassInfo";
import ClassWork from "../../Pages/ClassInfo/ClassWork/ClassWork";
import ClassPeople from "../../Pages/ClassInfo/ClassPeople/ClassPeople";

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
    {
        path: "/myhome",
        element: <PrivateRoute><Main></Main></PrivateRoute>,
        children: [
            {
                path: "/myhome",
                element: <PrivateRoute><MyHome></MyHome></PrivateRoute>
            },
            {
                path: "/myhome/profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: "/myhome/classinfo",
                element: <PrivateRoute><ClassLayout></ClassLayout></PrivateRoute>,
                children: [
                    {
                        path: "/myhome/classinfo/:id",
                        element: <PrivateRoute><ClassInfo></ClassInfo></PrivateRoute>
                    },
                    {
                        path: "/myhome/classinfo/classwork/:id",
                        element: <PrivateRoute><ClassWork></ClassWork></PrivateRoute>
                    },
                    {
                        path: "/myhome/classinfo/classpeople/:id",
                        element: <PrivateRoute><ClassPeople></ClassPeople></PrivateRoute>
                    },
                ]
            },
        ]
    },


])

export default router;