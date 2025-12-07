import { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { API_URL } from "../services/api";

export default function useChatSocket(user, onReceive) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    socketRef.current = io(API_URL, { transports: ["websocket"] });

    socketRef.current.on("receive_message", (msg) => {
      if (typeof onReceive === "function") onReceive(msg);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off("receive_message");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user, onReceive]);

  const sendMessage = useCallback((msg) => {
    if (socketRef.current) socketRef.current.emit("send_message", msg);
  }, []);

  return {
    sendMessage,
  };
}
