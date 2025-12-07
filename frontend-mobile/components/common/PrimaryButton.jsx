import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function PrimaryButton({ theme, label, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.primary }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
