import { StyleSheet } from "react-native";
import { darkTheme, lightTheme } from "./theme";

export const globalStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
      paddingTop: 60,
    },
    title: {
      color: theme.text,
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    input: {
      backgroundColor: theme.input,
      color: theme.text,
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
    },
    button: {
      backgroundColor: theme.primary,
      padding: 12,
      alignItems: "center",
      borderRadius: 8,
    },
    btnText: {
      color: "#fff",
      fontWeight: "bold",
    },
    userBtn: {
      padding: 15,
      backgroundColor: theme.card,
      marginBottom: 10,
      borderRadius: 8,
    },
    messageBubble: (isSender) => ({
      alignSelf: isSender ? "flex-end" : "flex-start",
      backgroundColor: isSender ? theme.primary : theme.card,
      padding: 8,
      marginVertical: 4,
      borderRadius: 8,
    }),
    messageText: {
      color: theme.text,
    },
    messageTime: {
      color: theme.textMuted,
      fontSize: 10,
    },
  });

export const themes = { darkTheme, lightTheme };
