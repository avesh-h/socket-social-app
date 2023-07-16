import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  styled,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNav } from "../../Context/Navigation";
import { useUpdateProfileMutation } from "../../features/api/userSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
  borderRadius: "15px",
};

const InputBox = styled(Box)({
  paddingTop: "20px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
});

const CustomInput = styled(TextField)({
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    padding: "3px",
  },
});

export default function UpdateUser({ userData, isEdit, setIsEdit }) {
  const [profile, setProfile] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
    isPrivate: userData.isPrivate,
  });

  //   const { handleClose, open, setOpen } = useNav();
  const [updateProfile, { isLoading, isSuccess, isError }] =
    useUpdateProfileMutation(profile);

  //add post data
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  //Submit post
  const submitHandler = async (e) => {
    e.preventDefault();
    if (profile.firstname && profile.lastname) {
      const response = await updateProfile(profile); //Rtk query call for the create post
      if (response?.data?.success) {
        setProfile({
          firstname: "",
          lastname: "",
          isPrivate: "false",
        });
        setIsEdit(false);
      } else {
        toast.error(response?.error?.status);
      }
    }
  };
  return (
    <div>
      <Modal
        open={isEdit}
        onClose={() => setIsEdit(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isError && <ToastContainer />}
          <h1 style={{ textAlign: "center" }}>Edit Profile</h1>
          <form onSubmit={submitHandler}>
            <FormControl>
              <InputBox>
                <label htmlFor="title">Firstname:</label>
                <CustomInput
                  type="text"
                  name="firstname"
                  onChange={changeHandler}
                  id="firstname"
                  value={profile.firstname}
                />
              </InputBox>
              <InputBox>
                <label htmlFor="image">Lastname:</label>
                <CustomInput
                  type="text"
                  name="lastname"
                  onChange={changeHandler}
                  id="lastname"
                  value={profile.lastname}
                />
              </InputBox>
              <InputBox>
                <FormLabel id="demo-radio-buttons-group-label">
                  Account Type:
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="false"
                  name="isPrivate"
                  sx={{ display: "flex", flexDirection: "row" }}
                  onChange={changeHandler}
                  value={profile.isPrivate}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Private"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Public"
                  />
                </RadioGroup>
              </InputBox>
            </FormControl>
            <InputBox>
              <Button type="submit">
                {isLoading ? <CircularProgress size={18} /> : "Update"}
              </Button>
            </InputBox>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
