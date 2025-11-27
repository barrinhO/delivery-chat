import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://10.1.156.97:3000", {
  transports: ["websocket"],
  autoConnect: true,
});

export default function ChatWeb() {
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
      sender: "atendente-web",
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send_message", msgData);
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-amber-400 mb-6">
        Chat em Tempo Real (Web)
      </h1>

      
      <div
        className="
          w-full max-w-xl h-96 bg-gray-800 rounded-lg shadow-xl p-4 
          overflow-y-auto overflow-x-hidden space-y-3
        "
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`
              flex flex-col max-w-[80%]
              ${
                msg.sender === "atendente-web"
                  ? "ml-auto items-end"
                  : "mr-auto items-start"
              }
              break-words
            `}
          >
            <div
              className="
                bg-gray-700 p-3 rounded-lg border border-gray-600 
                break-words overflow-x-hidden
              "
            >
              <p className="text-gray-200 break-words break-all whitespace-pre-wrap">
                <strong
                  className={`${
                    msg.sender === "atendente-web"
                      ? "text-blue-400"
                      : "text-green-400"
                  }`}
                >
                  {msg.sender}:
                </strong>{" "}
                {msg.text}
              </p>
              <span className="text-xs text-gray-400">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      
      <div className="flex w-full max-w-xl mt-4 gap-3">
        <input
          className="
            flex-1 p-3 rounded-lg bg-gray-800 text-gray-200 
            border border-gray-700 focus:ring-2 focus:ring-amber-400 
            outline-none break-words
          "
          placeholder="Digite uma mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="
            px-5 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 
            text-white font-semibold transition
          "
          onClick={sendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://10.1.156.97:3000", {
//   transports: ["websocket"],
//   autoConnect: true,
// });

// export default function ChatWeb() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("Conectado ao servidor:", socket.id);
//     });

//     socket.on("receive_message", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off("receive_message");
//       socket.off("connect");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message.trim().length === 0) return;

//     const msgData = {
//       text: message,
//       sender: "cliente-web",
//       time: new Date().toLocaleTimeString(),
//     };

//     socket.emit("send_message", msgData);
//     setMessage("");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
//       <h1 className="text-3xl font-bold text-amber-400 mb-6">
//         Chat em Tempo Real (Web)
//       </h1>

//       {/* LISTA DE MENSAGENS */}
//       <div
//         className="
//           w-full max-w-xl h-96 bg-gray-800 rounded-lg shadow-xl p-4
//           overflow-y-auto overflow-x-hidden space-y-3
//         "
//       >
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className="
//               bg-gray-700 p-3 rounded-lg border border-gray-600
//               break-words
//             "
//           >
//             <p className="text-gray-200 break-words">
//               <strong className="text-amber-300">{msg.sender}:</strong>{" "}
//               {msg.text}
//             </p>
//             <span className="text-xs text-gray-400">{msg.time}</span>
//           </div>
//         ))}
//       </div>

//       {/* ÁREA DE INPUT */}
//       <div className="flex w-full max-w-xl mt-4 gap-3">
//         <input
//           className="
//             flex-1 p-3 rounded-lg bg-gray-800 text-gray-200
//             border border-gray-700 focus:ring-2 focus:ring-amber-400
//             outline-none break-words
//           "
//           placeholder="Digite uma mensagem..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />

//         <button
//           className="
//             px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-600
//             text-gray-900 font-semibold transition
//           "
//           onClick={sendMessage}
//         >
//           Enviar
//         </button>
//       </div>
//     </div>
//   );
// }
