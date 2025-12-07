import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function UserItem({ theme, user, onPress }) {
  return (
    <TouchableOpacity
      style={{
        padding: 12,
        backgroundColor: theme.card,
        marginVertical: 6,
        borderRadius: 8,
      }}
      onPress={onPress}
    >
      <Text style={{ color: theme.text }}>
        {user.name} ({user.role})
      </Text>
    </TouchableOpacity>
  );
}
