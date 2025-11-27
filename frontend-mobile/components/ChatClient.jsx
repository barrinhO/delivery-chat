import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { io } from "socket.io-client";

const socket = io("http://10.1.156.97:3000", {
  transports: ["websocket"],
  autoConnect: true,
});

export default function ChatClient() {
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
    if (!message.trim()) return;

    const msgData = {
      text: message,
      sender: "cliente",
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send_message", msgData);
    setMessage("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#111827" }}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Chat em Tempo Real</Text>

        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View
              style={[
                styles.msgWrapper,
                item.sender === "cliente"
                  ? styles.msgRight
                  : styles.msgLeft,
              ]}
            >
              <View style={styles.msgBox}>
                <Text style={styles.msgText}>
                  <Text
                    style={{
                      color:
                        item.sender === "cliente" ? "#22c55e" : "#3b82f6",
                      fontWeight: "bold",
                    }}
                  >
                    {item.sender}:
                  </Text>{" "}
                  {item.text}
                </Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
          )}
          keyExtractor={(_, i) => i.toString()}
          style={{ width: "100%" }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma mensagem..."
            placeholderTextColor="#9ca3af"
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity style={[styles.button]} onPress={sendMessage}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fbbf24",
    textAlign: "center",
    marginBottom: 20,
  },
  msgWrapper: { maxWidth: "80%", marginBottom: 12 },
  msgRight: { alignSelf: "flex-end" },
  msgLeft: { alignSelf: "flex-start" },
  msgBox: {
    padding: 12,
    backgroundColor: "#1f2937",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#374151",
  },
  msgText: { fontSize: 16, color: "#e5e7eb" },
  time: {
    fontSize: 10,
    color: "#9ca3af",
    marginTop: 5,
    textAlign: "right",
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
    gap: 10,
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: "#374151",
    borderWidth: 1,
    padding: 12,
    backgroundColor: "#1f2937",
    color: "#e5e7eb",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#22c55e",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonText: { color: "#1f2937", fontWeight: "bold" },
});
