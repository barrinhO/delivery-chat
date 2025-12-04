import React from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function ChatScreen({
  selectedUser,
  messages,
  user,
  message,
  setMessage,
  sendMessage,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat com {selectedUser?.name}</Text>

      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              alignSelf:
                item.sender_id === user?.id ? "flex-end" : "flex-start",
              backgroundColor: "#222",
              padding: 8,
              marginVertical: 4,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff" }}>{item.content}</Text>
            <Text style={{ color: "#888", fontSize: 10 }}>{item.time}</Text>
          </View>
        )}
      />

      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.inputMsg}
          value={message}
          onChangeText={setMessage}
          placeholder="Digite uma mensagem"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20, paddingTop: 60 },
  title: { color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  inputMsg: {
    flex: 1,
    backgroundColor: "#333",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  sendBtn: {
    padding: 10,
    backgroundColor: "#0f0",
    marginLeft: 5,
    borderRadius: 8,
  },
});
