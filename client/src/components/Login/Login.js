import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormLabel,
  TextField,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../Context/Auth";
import { useLoginMutation } from "../../features/api/authSlice";

const MainBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "20px",
});

const CustomInput = styled(TextField)({
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    padding: "3px",
  },
});

const ErrorMsg = styled("span")({
  fontSize: "13px",
  color: "red",
  display: "block",
});

const labelStyle = {
  width: "100px",
};

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [serverError, setServerError] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  // const [cookies, setCookies] = useCookies(["token"]);

  const { auth, setAuth, loginHandler, logoutHanlder } = useAuth();

  useEffect(() => {}, [error]);

  //On change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setError({ ...error, [name]: "" });
    setServerError("");
    setLoginData({ ...loginData, [name]: value });
  };

  //Submit Form
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setError({ email: "Email is Empty!", password: "Password is Empty!" });
    } else {
      const response = await login(loginData); //rtk query call
      if (response?.data?.success) {
        localStorage.setItem("user", JSON.stringify(response.data));
        loginHandler(response); //Context function call
        setLoginData({ email: "", password: "" });
      } else {
        const { data } = response.error;
        setServerError(data?.message);
      }
    }
  };

  return (
    <>
      {/* {serverError ? (
        <div
          style={{
            width: "100%",
            background: "#f19393",
            color: "#fff",
            padding: "5px",
          }}
        >
          <p>{serverError}</p>
        </div>
      ) : (
        ""
      )} */}
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {serverError ? (
          <div
            style={{
              width: "400px",
              background: "#f19393",
              color: "#fff",
              marginBottom: "20px",
              borderRadius: "5px",
              position: "absolute",
              top: 0,
              marginTop: "20px",
              // padding: "5px",
            }}
          >
            <p>{serverError}</p>
          </div>
        ) : (
          ""
        )}
        <Card
          sx={{
            width: "400px",
            display: "flex",
            justifyContent: "center",
            boxShadow: "0px 1px 9px #00000078",
          }}
        >
          <Box
            sx={{
              width: "fit-content",
              border: "2px solid #fff",
              boxShadow: "2px 2px 2px #fff",
              padding: "10px",
            }}
          >
            <h1>Log In Form</h1>

            <form onSubmit={submitHandler}>
              <FormControl>
                <MainBox>
                  <FormLabel htmlFor="email" sx={labelStyle}>
                    Email:
                  </FormLabel>
                  <CustomInput
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={loginData.email}
                  />
                </MainBox>
                {error.email ? <ErrorMsg>{error.email}</ErrorMsg> : ""}
                <MainBox>
                  <FormLabel htmlFor="password" sx={labelStyle}>
                    Password:
                  </FormLabel>
                  <CustomInput
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    value={loginData.password}
                  />
                </MainBox>
                {error.password ? <ErrorMsg>{error.password}</ErrorMsg> : ""}
              </FormControl>
              <div style={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  sx={{
                    marginTop: "20px",
                  }}
                >
                  {isLoading ? <CircularProgress size={18} /> : "Log in"}
                  {/* Log in */}
                </Button>
              </div>
            </form>
            <Box sx={{ textAlign: "right", paddingTop: "10px" }}>
              Not Registered yet?<Link to="/"> Sign up</Link>
            </Box>
          </Box>
        </Card>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
