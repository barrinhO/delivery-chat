import { useState, useCallback } from "react";
import api from "../services/api";

export default function useChatState() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cliente");

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const login = useCallback(async () => {
    try {
      const data = await api.login(email, password);
      setUser(data);
      const list = await api.fetchUsers(
        data.role === "cliente" ? "atendente" : "cliente"
      );
      setUsers(list);
      return { success: true, data };
    } catch (err) {
      console.warn("login error", err?.response?.data || err.message);
      return { success: false, error: err };
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await api.register(name, email, password, role);
      return { success: true };
    } catch (err) {
      console.warn("register error", err?.response?.data || err.message);
      return { success: false, error: err };
    }
  }, [name, email, password, role]);

  const fetchUsers = useCallback(async (userRole) => {
    try {
      const targetRole = userRole === "cliente" ? "atendente" : "cliente";
      const list = await api.fetchUsers(targetRole);
      setUsers(list);
      return { success: true, list };
    } catch (err) {
      console.warn("fetchUsers error", err?.response?.data || err.message);
      return { success: false, error: err };
    }
  }, []);

  const selectUser = useCallback((u) => {
    setSelectedUser(u);
    setMessages([]);
  }, []);

  const appendMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,

    user,
    setUser,
    users,
    setUsers,
    fetchUsers,
    login,
    register,
    selectUser,

    selectedUser,
    message,
    setMessage,
    messages,
    appendMessage,
    setMessages,
  };
}
