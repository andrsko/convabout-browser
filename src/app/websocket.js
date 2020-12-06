import React, { createContext } from "react";
import { Socket } from "phoenix";
import { API_URL } from "../api";
import { useSelector } from "react-redux";

const WebSocketContext = createContext(null);

export { WebSocketContext };

const WebSocketProvider = ({ children }) => {
  const apiURLObject = new URL(API_URL);
  const token = useSelector((state) => state.auth.token);

  const ws_scheme = apiURLObject.protocol === "https:" ? "wss" : "ws";
  const ws_path = ws_scheme + "://" + apiURLObject.host + "/socket";
  const socket = new Socket(ws_path, { params: { token: token } });
  socket.connect();

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
