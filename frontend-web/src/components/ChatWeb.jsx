import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const API_URL = "http://192.168.224.1:3000";
const socket = io(API_URL, { transports: ["websocket"] });

export default function ChatWeb() {
  const [screen, setScreen] = useState("login"); // login, register, userlist, chat
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cliente");

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Recebe mensagens via socket
  useEffect(() => {
    socket.on("receive_message", (msg) => setMessages((prev) => [...prev, msg]));
    return () => socket.off("receive_message");
  }, []);

  // LOGIN
  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      setUser(res.data);
      fetchUsers(res.data.role);
      setScreen("userlist");
    } catch (err) {
      alert(err.response?.data?.error || "Erro no login");
    }
  };

  // CADASTRO
  const register = async () => {
    try {
      await axios.post(`${API_URL}/register`, { name, email, password, role });
      alert("Cadastro feito com sucesso!");
      setScreen("login");
    } catch (err) {
      alert(err.response?.data?.error || "Erro no cadastro");
    }
  };

  // LISTA DE USUÁRIOS (oposto do seu role)
  const fetchUsers = async (userRole) => {
    const targetRole = userRole === "cliente" ? "atendente" : "cliente";
    const res = await axios.get(`${API_URL}/users?role=${targetRole}`);
    setUsers(res.data);
  };

  // SELECIONA USUÁRIO PARA CHAT
  const selectUser = (u) => {
    setSelectedUser(u);
    setMessages([]);
    setScreen("chat");
  };

  // ENVIA MENSAGEM (não adiciona localmente!)
  const sendMessage = () => {
    if (!message.trim()) return;
    const msgData = {
      sender_id: user.id,
      receiver_id: selectedUser.id,
      content: message,
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("send_message", msgData);
    setMessage(""); // apenas limpa input
  };

  // TELAS
  if (screen === "login")
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
        <h1 className="text-3xl font-bold text-amber-400 mb-6">Login</h1>
        <input className="mb-2 p-2 rounded bg-gray-800 text-white" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="mb-2 p-2 rounded bg-gray-800 text-white" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="px-4 py-2 bg-blue-500 text-white rounded mb-2" onClick={login}>Login</button>
        <button className="text-blue-400" onClick={() => setScreen("register")}>Criar conta</button>
      </div>
    );

  if (screen === "register")
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
        <h1 className="text-3xl font-bold text-amber-400 mb-6">Cadastro</h1>
        <input className="mb-2 p-2 rounded bg-gray-800 text-white" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="mb-2 p-2 rounded bg-gray-800 text-white" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="mb-2 p-2 rounded bg-gray-800 text-white" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input className="mb-2 p-2 rounded bg-gray-800 text-white" placeholder="Role (cliente ou atendente)" value={role} onChange={(e) => setRole(e.target.value)} />
        <button className="px-4 py-2 bg-green-500 text-white rounded mb-2" onClick={register}>Cadastrar</button>
        <button className="text-blue-400" onClick={() => setScreen("login")}>Voltar</button>
      </div>
    );

  if (screen === "userlist")
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6">
        <h1 className="text-3xl font-bold text-amber-400 mb-6">Selecione um usuário</h1>
        <div className="w-full max-w-md">
          {users.map((u) => (
            <button key={u.id} className="w-full mb-2 p-3 bg-gray-800 text-white rounded" onClick={() => selectUser(u)}>
              {u.name} ({u.role})
            </button>
          ))}
        </div>
      </div>
    );

  if (screen === "chat")
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6">
        <h1 className="text-3xl font-bold text-amber-400 mb-6">Chat com {selectedUser.name}</h1>
        <div className="w-full max-w-xl h-96 bg-gray-800 rounded-lg p-4 overflow-y-auto mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col max-w-[80%] mb-2 ${msg.sender_id === user.id ? "ml-auto items-end" : "mr-auto items-start"}`}>
              <div className="bg-gray-700 p-2 rounded border border-gray-600 break-words">
                <strong className={msg.sender_id === user.id ? "text-blue-400" : "text-green-400"}>
                  {msg.sender_id === user.id ? "Você" : selectedUser.name}:
                </strong>{" "}
                {msg.content}
                <div className="text-xs text-gray-400 text-right">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full max-w-xl gap-2">
          <input className="flex-1 p-2 rounded bg-gray-800 text-white" placeholder="Digite uma mensagem..." value={message} onChange={(e) => setMessage(e.target.value)} />
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={sendMessage}>Enviar</button>
        </div>
      </div>
    );
}
