import React from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../../styles/global";
import { chatStyles } from "../../styles/screens/chatStyles";
import MessageBubble from "../chat/MessageBubble";
import ThemeToggle from "../common/ThemeToggle";

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
  const s = chatStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat com {selectedUser?.name}</Text>

      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <MessageBubble theme={theme} userId={user?.id} message={item} />
        )}
      />

      <View style={s.inputArea}>
        <TextInput
          style={s.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Mensagem..."
          placeholderTextColor={theme.textMuted}
        />
        <TouchableOpacity style={s.sendBtn} onPress={sendMessage}>
          <Text style={s.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>

      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </View>
  );
}
