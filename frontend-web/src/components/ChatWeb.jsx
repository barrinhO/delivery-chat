import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

import Login from "./Login";
import Register from "./Register";
import UserList from "./UserList";
import ChatBox from "./ChatBox";

const API_URL = "http://10.121.36.197:3000";
const socket = io(API_URL, { transports: ["websocket"] });

export default function ChatWeb() {
  const [screen, setScreen] = useState("login"); // login, register, userlist, chat
  const [user, setUser] = useState(null);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("receive_message");
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      setUser(res.data);
      fetchUsers(res.data.role);
      setScreen("userlist");
    } catch (err) {
      alert(err.response?.data?.error || "Erro no login");
    }
  };

  const register = async (data) => {
    try {
      await axios.post(`${API_URL}/register`, data);
      alert("Cadastro feito com sucesso!");
      setScreen("login");
    } catch (err) {
      alert(err.response?.data?.error || "Erro no cadastro");
    }
  };

  const fetchUsers = async (userRole) => {
    const targetRole = userRole === "cliente" ? "atendente" : "cliente";
    const res = await axios.get(`${API_URL}/users?role=${targetRole}`);
    setUsers(res.data);
  };

  const selectUser = (u) => {
    setSelectedUser(u);
    setMessages([]);
    setScreen("chat");
  };

  const sendMessage = (content) => {
    const msgData = {
      sender_id: user.id,
      receiver_id: selectedUser.id,
      content,
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("send_message", msgData);
  };

  // Renderização das telas
  if (screen === "login") {
    return <Login onLogin={login} goRegister={() => setScreen("register")} />;
  }

  if (screen === "register") {
    return (
      <Register onRegister={register} goLogin={() => setScreen("login")} />
    );
  }

  if (screen === "userlist") {
    return <UserList users={users} selectUser={selectUser} />;
  }

  if (screen === "chat") {
    return (
      <ChatBox
        user={user}
        selectedUser={selectedUser}
        messages={messages}
        sendMessage={sendMessage}
      />
    );
  }
}
