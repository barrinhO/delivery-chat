import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import bcrypt from "bcrypt";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// Supabase
const supabaseUrl = "https://zgqrivenokxefeirhcly.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpncXJpdmVub2t4ZWZlaXJoY2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MDU2MjcsImV4cCI6MjA4MDE4MTYyN30.xOe47UM4rHbLdZOwX5QBCS8Ec04iZKajWlIf929eQV0";
const supabase = createClient(supabaseUrl, supabaseKey);

// Rotas de teste
app.get("/", (req, res) => res.send("API rodando 🚀"));

// Cadastro
app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, password: hashed, role }])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data: users } = await supabase.from("users").select("*").eq("email", email);
  if (!users || users.length === 0) return res.status(400).json({ error: "Usuário não encontrado" });
  const user = users[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Senha inválida" });
  res.json({ id: user.id, name: user.name, role: user.role });
});

// Lista de usuários (clientes ou atendentes)
app.get("/users", async (req, res) => {
  const role = req.query.role;
  const { data, error } = await supabase.from("users").select("*").eq("role", role);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Cria servidor HTTP e Socket.IO
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Socket.IO
io.on("connection", (socket) => {
  console.log("Dispositivo conectado:", socket.id);

  socket.on("send_message", async (data) => {
    const { sender_id, receiver_id, content } = data;
    const { data: msg, error } = await supabase
      .from("messages")
      .insert([{ sender_id, receiver_id, content }])
      .select();
    if (!error) io.emit("receive_message", msg[0]);
  });

  socket.on("disconnect", () => console.log("Dispositivo desconectado:", socket.id));
});

server.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
