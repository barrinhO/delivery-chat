import React from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { globalStyles } from "../styles/global";

export default function ChatScreen({
  selectedUser,
  messages,
  user,
  message,
  setMessage,
  sendMessage,
  theme,
  toggleTheme,
}) {
  const styles = globalStyles(theme);

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
              backgroundColor:
                item.sender_id === user?.id ? theme.primary : theme.card,
              padding: 8,
              marginVertical: 4,
              borderRadius: 8,
              maxWidth: "80%",
            }}
          >
            <Text style={{ color: theme.text }}>{item.content}</Text>
            <Text style={{ color: theme.textMuted, fontSize: 10 }}>
              {item.time}
            </Text>
          </View>
        )}
      />

      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Digite uma mensagem"
          placeholderTextColor={theme.textMuted}
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.btnText}>Enviar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={{ marginTop: 10 }} onPress={toggleTheme}>
        <Text style={{ color: theme.textMuted }}>Alterar Tema</Text>
      </TouchableOpacity>
    </View>
  );
}
