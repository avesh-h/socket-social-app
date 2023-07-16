import { io } from "socket.io-client";

const URL = "http://localhost:4004";

export let socket = null;

export const connectSocket = (token) => {
  if (token) {
    socket = io(URL, {
      extraHeaders: {
        auth: token,
      },
    });
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
