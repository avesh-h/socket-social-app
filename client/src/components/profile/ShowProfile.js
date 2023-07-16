import React, { useState } from "react";
import ProfileData from "./ProfileData";
import UpdateUser from "./UpdateUser";
import { useGetProfileQuery } from "../../features/api/userSlice";

const ShowProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  //Api call for get profile Info
  const { data, isSuccess, isError } = useGetProfileQuery();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {isSuccess && (
        <>
          <ProfileData
            userData={data?.data}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
          {isEdit && (
            <UpdateUser
              userData={data?.data}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              // handleClose={handleClose}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ShowProfile;
