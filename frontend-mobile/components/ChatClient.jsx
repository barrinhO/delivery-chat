import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { io } from "socket.io-client";
import axios from "axios";

import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import UserListScreen from "./UserListScreen";
import ChatScreen from "./ChatScreen";
import { lightTheme, darkTheme } from "../styles/theme";

const API_URL = "http://26.105.105.149:3000";
const socket = io(API_URL, { transports: ["websocket"] });

export default function ChatClient() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cliente");

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [theme, setTheme] = useState(darkTheme);
  const toggleTheme = () =>
    setTheme(theme === darkTheme ? lightTheme : darkTheme);

  useEffect(() => {
    socket.on("receive_message", (msg) =>
      setMessages((prev) => [...prev, msg])
    );
    return () => socket.off("receive_message");
  }, []);

  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      setUser(res.data);
      fetchUsers(res.data.role);
      setScreen("userlist");
    } catch {
      alert("Erro no login");
    }
  };

  const register = async () => {
    try {
      await axios.post(`${API_URL}/register`, { name, email, password, role });
      alert("Cadastro feito!");
      setScreen("login");
    } catch {
      alert("Erro no cadastro");
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

  const sendMessage = () => {
    if (!message.trim()) return;
    const msg = {
      sender_id: user.id,
      receiver_id: selectedUser.id,
      content: message,
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("send_message", msg);
    setMessage("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {screen === "login" ? (
        <LoginScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          login={login}
          setScreen={setScreen}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      ) : screen === "register" ? (
        <RegisterScreen
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          role={role}
          setRole={setRole}
          register={register}
          setScreen={setScreen}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      ) : screen === "userlist" ? (
        <UserListScreen
          users={users}
          selectUser={selectUser}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      ) : (
        <ChatScreen
          selectedUser={selectedUser}
          messages={messages}
          user={user}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
    </KeyboardAvoidingView>
  );
}
