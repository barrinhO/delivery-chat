import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// rota de teste
app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

// CRIA O SERVIDOR HTTP
const server = http.createServer(app);

// CRIA O SERVIDOR WEBSOCKET
const io = new Server(server, {
  cors: {
    origin: "*",  // deixa qualquer dispositivo conectar
  }
});

// EVENTO DE CONEXÃO
io.on("connection", (socket) => {
  console.log("Dispositivo conectado:", socket.id);

  socket.on("send_message", (data) => {
    console.log("Mensagem recebida:", data);
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("Dispositivo desconectado:", socket.id);
  });
});

// INICIA O SERVIDOR
server.listen(3000, "0.0.0.0", () => {
  console.log("Servidor rodando em http://0.0.0.0:3000");
});
