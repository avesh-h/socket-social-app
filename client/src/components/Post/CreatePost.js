import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FileBase64 from "react-file-base64";
import { useCreatePostMutation } from "../../features/api/postSlice";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  styled,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useNav } from "../../Context/Navigation";
import { ToastContainer, toast } from "react-toastify";

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

export default function CreatePost({ create, setCreate }) {
  const [post, setPost] = useState({
    title: "",
    description: "",
    // image: null,
    isPrivate: "false",
  });
  // const { handleClose, open } = useNav();
  const [createPost, { isLoading, isSuccess, isError }] =
    useCreatePostMutation();

  //add post data
  const changeHandler = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setPost({ ...post, image: files[0] });
    } else {
      setPost({ ...post, [name]: value });
    }
  };

  //Submit post
  const submitHandler = async (e) => {
    e.preventDefault();
    // const fd = new FormData();
    // fd.append("image", post.image);
    // const fullPost = {
    //   ...post,
    //   image: fd,
    // };
    if (post.title && post.description) {
      const response = await createPost(post); //Rtk query call for the create post
      if (response.data?.data?._id) {
        setPost({
          title: "",
          description: "",
          // image: null,
          isPrivate: "false",
        });
        setCreate(false);
      } else {
        toast.error(response?.error?.status);
      }
    }
  };
  return (
    <div>
      <Modal
        open={create}
        onClose={() => setCreate(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isError && <ToastContainer />}
          <h1 style={{ textAlign: "center" }}>Create Your Post</h1>
          <form onSubmit={submitHandler}>
            <FormControl>
              <InputBox>
                <label htmlFor="title">Title:</label>
                <CustomInput
                  type="text"
                  name="title"
                  onChange={changeHandler}
                  id="title"
                  value={post.title}
                />
              </InputBox>
              <InputBox>
                <label htmlFor="image">Image:</label>
                <CustomInput
                  type="file"
                  name="image"
                  onChange={changeHandler}
                />
              </InputBox>
              {/* <InputBox>
                <label htmlFor="image">Image:</label>
                <FileBase64
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => setPost({ ...post, image: base64 })}
                />
              </InputBox> */}
              <InputBox>
                <label htmlFor="desc">Description:</label>
                <TextField
                  onChange={changeHandler}
                  name="description"
                  id="desc"
                  value={post.description}
                />
              </InputBox>
              <InputBox>
                <FormLabel id="demo-radio-buttons-group-label">
                  Private Post:
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="false"
                  name="isPrivate"
                  sx={{ display: "flex", flexDirection: "row" }}
                  onChange={changeHandler}
                  value={post.isPrivate}
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
                {isLoading ? <CircularProgress size={18} /> : "Create"}
              </Button>
            </InputBox>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
