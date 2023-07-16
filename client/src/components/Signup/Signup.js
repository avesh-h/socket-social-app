import {
  Box,
  Card,
  CircularProgress,
  FormControl,
  FormLabel,
  TextField,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpCtx } from "../../Context/SignUp";
import { useSignupMutation } from "../../features/api/authSlice";

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
  width: "120px",
};

const Signup = () => {
  const { signUpData, setSignUpData } = SignUpCtx();
  const [error, setError] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  //Onchange
  const handleChange = (e) => {
    const { value, name } = e.target;
    setError({ ...error, [name]: "" });
    setServerError("");
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  //form validation
  const validateForm = (values) => {
    if (!values.firstname) error.firstname = "Firstname is Required";
    if (!values.lastname) error.lastname = "Lastname is Required";
    if (!values.username) error.username = "Username is Required";
    if (!values.email) {
      error.email = "Email is Required";
    }
    if (!values.password) {
      error.password = "Password is Required";
    }
    return { ...error };
  };

  //form Submit
  const submitHandler = async (e) => {
    e.preventDefault();
    setError(validateForm(signUpData));
    if (
      signUpData.firstname &&
      signUpData.lastname &&
      signUpData.username &&
      signUpData.email &&
      signUpData.password
    ) {
      const response = await signup(signUpData);
      if (response?.data?.success) {
        navigate("/login");
        setSignUpData({
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
        });
      } else {
        const { data } = response.error;
        setServerError(data?.message);
      }
    }
  };

  return (
    <>
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
            <h1>Sign Up Form</h1>

            <form onSubmit={submitHandler}>
              <FormControl>
                <MainBox>
                  <FormLabel htmlFor="firstname" sx={labelStyle}>
                    First Name:
                  </FormLabel>
                  <CustomInput
                    id="firstname"
                    name="firstname"
                    type="text"
                    onChange={handleChange}
                    value={signUpData.firstname}
                    // required
                  />
                </MainBox>
                {error.firstname ? <ErrorMsg>{error.firstname}</ErrorMsg> : ""}
                <MainBox>
                  <FormLabel htmlFor="lastname" sx={labelStyle}>
                    Last Name:
                  </FormLabel>
                  <CustomInput
                    id="lastname"
                    name="lastname"
                    type="text"
                    onChange={handleChange}
                    value={signUpData.lastname}
                    // required
                  />
                </MainBox>
                {error.lastname ? <ErrorMsg>{error.lastname}</ErrorMsg> : ""}
                <MainBox>
                  <FormLabel htmlFor="username" sx={labelStyle}>
                    User Name:
                  </FormLabel>
                  <CustomInput
                    id="username"
                    name="username"
                    type="text"
                    onChange={handleChange}
                    value={signUpData.username}
                    // required
                  />
                </MainBox>
                {error.username ? <ErrorMsg>{error.username}</ErrorMsg> : ""}
                <MainBox>
                  <FormLabel htmlFor="email" sx={labelStyle}>
                    Email:
                  </FormLabel>
                  <CustomInput
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={signUpData.email}
                    // required
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
                    value={signUpData.password}
                    // required
                  />
                </MainBox>
                {error.password ? <ErrorMsg>{error.password}</ErrorMsg> : ""}
              </FormControl>
              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  style={{
                    marginTop: "20px",
                    backgroundColor: "black",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {isLoading ? <CircularProgress /> : "Submit"}
                </button>
              </div>
            </form>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "20px",
              }}
            >
              Already Registered ?<Link to="/login">Log In</Link>
            </Box>
          </Box>
        </Card>
      </div>
    </>
  );
};

export default Signup;
