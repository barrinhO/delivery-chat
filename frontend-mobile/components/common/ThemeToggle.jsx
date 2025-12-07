import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <TouchableOpacity style={{ marginTop: 20 }} onPress={toggleTheme}>
      <Text style={{ color: theme.textMuted, fontSize: 14 }}>Alterar Tema</Text>
    </TouchableOpacity>
  );
}
