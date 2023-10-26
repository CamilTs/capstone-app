import { useEffect, useMemo, useState } from "react";
import { Manager } from "socket.io-client";

export const useSocket = (serverPatch) => {
  const manager = useMemo(() => new Manager(serverPatch, { transports: ["websocket"] }), [serverPatch]);

  const socket = manager.socket("/");
  const [online, setOnline] = useState(false);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => setOnline(true));
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => setOnline(false));
  }, [socket]);

  return {
    socket,
    online,
  };
};
