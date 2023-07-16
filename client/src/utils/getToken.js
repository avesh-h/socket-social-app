import { Cookies } from "react-cookie";

const cookies = new Cookies();
export const getToken = () => {
  return cookies.get("token");
};
