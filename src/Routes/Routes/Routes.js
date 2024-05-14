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
import ClassPeople from "../../Pages/ClassInfo/ClassPeople/ClassPeople";
import ClassInfo from "../../Pages/ClassInfo/ClassInfo/ClassInfo/ClassInfo";
import Quizzes from "../../Pages/ClassInfo/Works/Quizzes/Quizzes/Quizzes";
import Assignments from "../../Pages/ClassInfo/Works/Assignments/Assignments/Assignments";
import ViewQuiz from "../../Pages/ClassInfo/Works/Quizzes/ViewQuiz/ViewQuiz/ViewQuiz";
import ViewAssignment from "../../Pages/ClassInfo/Works/Assignments/ViewAssignment/ViewAssignment";
import PaperChecker from "../../Pages/PaperChecker/PaperChecker/PaperChecker";
import Chat from "../../Pages/ClassInfo/Chat/Chat/Chat";
import PaperSummery from "../../Pages/PaperChecker/PaperSummery/PaperSummery";
import AllPaper from "../../Pages/PaperChecker/AllPaper/AllPaper";
import TeacherRoute from "../TeacherRoute/TeacherRoute";
import PremiumRoute from "../PremiumRoute/PremiumRoute";
import Checkout from "../../Pages/Payment/Checkout/Checkout";
import Payment from "../../Pages/Payment/Payment/Payment";

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
                path: "/myhome/viewquizzes/:id",
                element: <PrivateRoute><ViewQuiz></ViewQuiz></PrivateRoute>
            },
            {
                path: "/myhome/viewassignment/:id",
                element: <PrivateRoute><ViewAssignment></ViewAssignment></PrivateRoute>
            },
            {
                path: "/myhome/paperchecker",
                element: <TeacherRoute><PremiumRoute><PaperChecker></PaperChecker></PremiumRoute></TeacherRoute>
            },
            {
                path: "/myhome/allpaper",
                element: <TeacherRoute><PremiumRoute><AllPaper></AllPaper></PremiumRoute></TeacherRoute>
            },
            {
                path: "/myhome/papersummery/:id",
                element: <TeacherRoute><PremiumRoute><PaperSummery></PaperSummery></PremiumRoute></TeacherRoute>
            },
            {
                path: "/myhome/checkout",
                element: <TeacherRoute><Checkout></Checkout></TeacherRoute>
            },
            {
                path: "/myhome/payment",
                element: <TeacherRoute><Payment></Payment></TeacherRoute>
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
                        path: "/myhome/classinfo/quizzes/:id",
                        element: <PrivateRoute><Quizzes></Quizzes></PrivateRoute>
                    },
                    {
                        path: "/myhome/classinfo/assignments/:id",
                        element: <PrivateRoute><Assignments></Assignments></PrivateRoute>
                    },
                    {
                        path: "/myhome/classinfo/classpeople/:id",
                        element: <PrivateRoute><ClassPeople></ClassPeople></PrivateRoute>
                    },
                    {
                        path: "/myhome/classinfo/chat/:id",
                        element: <PrivateRoute><Chat></Chat></PrivateRoute>
                    }
                ]
            },
        ]
    },


])

export default router;