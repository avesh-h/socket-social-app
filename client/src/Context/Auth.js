import jwtDecode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connectSocket, disconnectSocket } from "../socket";
import { getToken } from "../utils/getToken";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getToken());
  const [cookies, setCookies, removeCookie] = useCookies(["token"]);

  //Login functionality
  const loginHandler = (response) => {
    setAuth(response.data.data.token);
    const decoded = jwtDecode(response.data.data.token);
    setCookies("token", response.data.data.token, {
      expires: new Date(decoded.exp * 1000),
    });
  };

  //Logout functionality
  const logoutHandler = () => {
    removeCookie("token");
    setAuth("");
  };

  useEffect(() => {
    if (auth) {
      connectSocket(auth);
    } else {
      disconnectSocket();
    }
    return () => {
      if (auth) {
        disconnectSocket();
      }
    };
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, loginHandler, logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
