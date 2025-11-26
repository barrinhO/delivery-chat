import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://10.1.156.147:3000", {
  // pra quem for testar, coloque seu ip. ex = "http://'111.111.1.1:'3000"
  transports: ["websocket"],
  autoConnect: true,
});

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado ao servidor:", socket.id);
    });

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("connect");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim().length === 0) return;

    const msgData = {
      text: message,
      sender: "cliente-web",
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send_message", msgData);
    setMessage("");
  };

  return (
    <div className="container">
      <h1>Chat em Tempo Real (Web)</h1>

      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className="msgBox">
            <p className="msgText">
              <strong>{msg.sender}:</strong> {msg.text}
            </p>
            <span className="time">{msg.time}</span>
          </div>
        ))}
      </div>

      <div className="inputArea">
        <input
          className="input"
          placeholder="Digite uma mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default App;
