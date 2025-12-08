import { useState, useRef, useEffect } from "react";

export default function ChatBox({
  user,
  selectedUser,
  messages,
  sendMessage,
  goBack,
}) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
  };

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-amber-400 mb-4 flex items-center w-full max-w-xl justify-between">
        <button
          className="px-2 py-1 bg-gray-700 rounded text-white"
          onClick={goBack}
        >
          ← Voltar
        </button>
        <span>Chat com {selectedUser.name}</span>
        <span className="w-16"></span>
      </h1>

      <div className="w-full max-w-xl h-96 bg-gray-800 rounded-lg p-4 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col max-w-[80%] mb-2 ${
              msg.sender_id === user.id
                ? "ml-auto items-end"
                : "mr-auto items-start"
            }`}
          >
            <div className="bg-gray-700 p-2 rounded border border-gray-600 break-words">
              <strong
                className={
                  msg.sender_id === user.id ? "text-blue-400" : "text-green-400"
                }
              >
                {msg.sender_id === user.id ? "Você" : selectedUser.name}:
              </strong>{" "}
              {msg.content}
              <div className="text-xs text-gray-400 text-right">{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex w-full max-w-xl gap-2">
        <input
          className="flex-1 p-2 rounded bg-gray-800 text-white"
          placeholder="Digite uma mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSend}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
