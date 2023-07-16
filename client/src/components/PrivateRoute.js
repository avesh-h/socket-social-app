import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/getToken";
// import { Cookies } from "react-cookie";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = getToken();

  return <div>{isLoggedIn ? children : <Navigate to="/login" />}</div>;
};

export default PrivateRoute;
