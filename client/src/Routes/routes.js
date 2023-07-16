import { useRoutes } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Login from "../components/Login/Login";
import MainLayout from "../components/MainLayout";
import MyFeeds from "../components/Post/MyFeeds";
import Signup from "../components/Signup/Signup";
import Chat from "../pages/Chat";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

export default function Routes() {
  const element = useRoutes([
    {
      element: <AuthLayout />,
      children: [
        { path: "/", element: <Signup /> },
        { path: "/login", element: <Login /> },
      ],
    },
    {
      element: <MainLayout />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        { path: "/profile", element: <Profile /> },
        { path: "/myfeeds", element: <MyFeeds /> },
        {
          path: "/chats",
          element: <Chat />,
          children: [{ path: "/chats/:id", element: <Chat /> }],
        },
      ],
    },
  ]);
  return element;
}
