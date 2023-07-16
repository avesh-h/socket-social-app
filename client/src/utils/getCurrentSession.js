export const getLoggedInUser = () => {
  const getUser = JSON.parse(localStorage.getItem("user"));
  if (Object.keys(getUser).length) {
    return getUser.data;
  }
};
