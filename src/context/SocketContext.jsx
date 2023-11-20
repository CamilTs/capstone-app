/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useSocket } from "../hooks/useSocket";

export const SocketContext = createContext();

export const useContextSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const { socket, online } = useSocket("http://localhost:81/socket.io/socket.io.js");
  const value = { socket, online };
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
