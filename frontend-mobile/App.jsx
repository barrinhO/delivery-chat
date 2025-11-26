import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import { io } from "socket.io-client";

const socket = io("http://10.1.156.147:3000", {
  transports: ["websocket"],
  autoConnect: true,
});

export default function App() {
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
      sender: "cliente",
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send_message", msgData);

    setMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat em Tempo Real</Text>

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.msgBox}>
            <Text style={styles.msgText}>
              {item.sender}: {item.text}
            </Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
        keyExtractor={(_, i) => i.toString()}
        style={{ width: "100%" }}
      />

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma mensagem..."
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Enviar" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  msgBox: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  msgText: {
    fontSize: 16,
  },
  time: {
    fontSize: 10,
    color: "#666",
    marginTop: 5,
    textAlign: "right",
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderColor: "#aaa",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
});
