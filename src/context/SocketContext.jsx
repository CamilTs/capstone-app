/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useSocket } from "../hooks/useSocket";
import { enviroment } from "../../enviroment";

// const url = `${enviroment.API_URL}/socket.io/socket.io.js`;
// const url = "https://capstone-ai-zi.onrender.com//socket.io/socket.io.js";
const url = "http://localhost:81//socket.io/socket.io.js";

export const SocketContext = createContext();

export const useContextSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const { socket, online } = useSocket(url);
  const value = { socket, online };
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
