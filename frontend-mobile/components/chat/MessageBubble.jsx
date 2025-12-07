import React from "react";
import { View, Text } from "react-native";

export default function MessageBubble({ theme, userId, message }) {
  const isMine = message.sender_id === userId;

  return (
    <View
      style={{
        alignSelf: isMine ? "flex-end" : "flex-start",
        backgroundColor: isMine ? theme.primary : theme.card,
        padding: 8,
        marginVertical: 4,
        borderRadius: 8,
        maxWidth: "80%",
      }}
    >
      <Text style={{ color: theme.text }}>{message.content}</Text>
      <Text style={{ color: theme.textMuted, fontSize: 10 }}>
        {message.time}
      </Text>
    </View>
  );
}
