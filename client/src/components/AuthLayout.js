import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./../Context/Auth";

const AuthLayout = () => {
  const { auth } = useAuth();
  return <>{!auth ? <Outlet /> : <Navigate to="/home" />}</>;
};

export default AuthLayout;
