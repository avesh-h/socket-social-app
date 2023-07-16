import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { getToken } from "../utils/getToken";

const MainLayout = () => {
  const isLoggedIn = getToken();
  return (
    <>
      {isLoggedIn ? <Navbar /> : null}
      {isLoggedIn ? <Outlet /> : <Navigate to="/login" />}
    </>
  );
};

export default MainLayout;
