import { createContext, useState, useContext } from "react";

const SignUpContext = createContext();

const SignUpProvider = ({ children }) => {
  const [signUpData, setSignUpData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  return (
    <SignUpContext.Provider value={{ signUpData, setSignUpData }}>
      {children}
    </SignUpContext.Provider>
  );
};

export const SignUpCtx = () => {
  return useContext(SignUpContext);
};

export { SignUpContext, SignUpProvider };
