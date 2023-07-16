import React from "react";
import img from "../../assets/default_profile.avif";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  styled,
} from "@mui/material";

const DataBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  paddingTop: "20px",
  paddingBottom: "3px",
  borderBottom: "1px solid #ccc",
});

const TypographyStyle = {
  fontSize: 20,
  width: "150px",
};
const profilStyle = {
  display: "flex",
  justifyContent: "center",
  paddingTop: "20px",
  gap: "20px",
};

const editButton = {
  border: "none",
  backgroundColor: "#3498db",
  color: "#fff",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
};

const profileDetails = { display: "flex" };

const ProfileData = ({ userData, isEdit, setIsEdit }) => {
  return (
    <div style={{ width: "100", paddingTop: "20px" }}>
      <Card
        sx={{
          width: "500px",
          boxShadow: "0px 1px 3px 4px #b5b5b5",
          borderRadius: "8px",
        }}
      >
        <CardContent>
          <Box sx={{ textAlign: "center" }}>
            <img src={img} style={{ width: "150px" }} />
            <Typography>{userData.username}</Typography>
            <Box sx={profilStyle}>
              <Box sx={profileDetails}>
                <Typography>Followers:</Typography>
                <Typography>{userData.totalFollower}</Typography>
              </Box>
              <Box sx={profileDetails}>
                <Typography>Following:</Typography>
                <Typography>{userData.totalFollowing}</Typography>
              </Box>
            </Box>
          </Box>
          <h1>Profile</h1>
          <DataBox>
            <Typography
              sx={TypographyStyle}
              variant="h4"
              color="text.secondary"
            >
              Firstname :
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {userData.firstname}
            </Typography>
          </DataBox>
          <DataBox>
            <Typography
              sx={TypographyStyle}
              variant="h4"
              color="text.secondary"
            >
              LastName :
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {userData.lastname}
            </Typography>
          </DataBox>
          <DataBox>
            <Typography
              sx={TypographyStyle}
              variant="h4"
              color="text.secondary"
            >
              Email :
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {userData.email}
            </Typography>
          </DataBox>
          <DataBox>
            <Typography
              sx={TypographyStyle}
              variant="h4"
              color="text.secondary"
            >
              Account Type :
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {userData.isPrivate ? "Private" : "Public"}
            </Typography>
          </DataBox>
          <DataBox>
            <Typography
              sx={TypographyStyle}
              variant="h4"
              color="text.secondary"
            >
              Verified :
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {userData.isVerified ? "Yes" : "No"}
            </Typography>
          </DataBox>
          <DataBox>
            <Typography
              sx={TypographyStyle}
              variant="h4"
              color="text.secondary"
            >
              Created Date :
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {userData.created_at.split("T")[0]}
            </Typography>
          </DataBox>
          <Box sx={{ paddingTop: "20px" }}>
            <button style={editButton} onClick={() => setIsEdit(true)}>
              Edit Profile
            </button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileData;
