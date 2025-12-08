import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

import Login from "./Login";
import Register from "./Register";
import UserList from "./UserList";
import ChatBox from "./ChatBox";

const API_URL = "http://172.18.112.1:3000";
const socket = io(API_URL, { transports: ["websocket"] });

export default function ChatWeb() {
  const [screen, setScreen] = useState("login");
  const [history, setHistory] = useState([]);

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  // -------------------------
  // SOCKET LISTENER
  // -------------------------
  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  // -------------------------
  // NAVEGAR ENTRE TELAS
  // -------------------------
  const navigate = (nextScreen) => {
    setHistory((prev) => [...prev, screen]); // salva tela atual
    setScreen(nextScreen);
  };

  const goBack = () => {
    setHistory((prev) => {
      if (prev.length === 0) {
        setScreen("login");
        return [];
      }

      const newHistory = [...prev];
      const lastScreen = newHistory.pop();

      setScreen(lastScreen);
      return newHistory;
    });
  };

  // -------------------------
  // LOGIN
  // -------------------------
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      setUser(res.data);

      await fetchUsers(res.data.role);

      navigate("userlist");
    } catch (err) {
      alert(err.response?.data?.error || "Erro no login");
    }
  };

  // -------------------------
  // CADASTRO
  // -------------------------
  const register = async (data) => {
    try {
      await axios.post(`${API_URL}/register`, data);
      alert("Cadastro feito com sucesso!");
      navigate("login");
    } catch (err) {
      alert(err.response?.data?.error || "Erro no cadastro");
    }
  };

  // -------------------------
  // BUSCAR USUÁRIOS
  // -------------------------
  const fetchUsers = async (userRole) => {
    const targetRole = userRole === "cliente" ? "atendente" : "cliente";
    const res = await axios.get(`${API_URL}/users?role=${targetRole}`);
    setUsers(res.data);
  };

  // -------------------------
  // ABRIR CHAT COM USUÁRIO
  // -------------------------
  const selectUser = (u) => {
    setSelectedUser(u);
    setMessages([]);
    navigate("chat");
  };

  // -------------------------
  // ENVIAR MENSAGEM
  // -------------------------
  const sendMessage = (content) => {
    const msgData = {
      sender_id: user.id,
      receiver_id: selectedUser.id,
      content,
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("send_message", msgData);
  };

  // -------------------------
  // RENDERIZAÇÃO DAS TELAS
  // -------------------------
  if (screen === "login") {
    return <Login onLogin={login} goRegister={() => navigate("register")} />;
  }

  if (screen === "register") {
    return <Register onRegister={register} goLogin={goBack} />;
  }

  if (screen === "userlist") {
    return <UserList users={users} selectUser={selectUser} goBack={goBack} />;
  }

  if (screen === "chat") {
    return (
      <ChatBox
        user={user}
        selectedUser={selectedUser}
        messages={messages}
        sendMessage={sendMessage}
        goBack={goBack}
      />
    );
  }

  return null; // fallback de segurança
}
