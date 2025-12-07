import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import UserListScreen from "./UserListScreen";
import ChatScreen from "./ChatScreen";

import useScreen from "../../hooks/useScreen";
import useChatState from "../../hooks/useChatState";
import useChatSocket from "../../hooks/useChatSocket";

import { lightTheme, darkTheme } from "../../styles/theme";

const INITIAL_SCREEN = "login";

export default function ChatClient() {
  const { screen, goTo, setScreen } = useScreen(INITIAL_SCREEN);
  const chat = useChatState();
  const [theme, setTheme] = useState(darkTheme);
  const toggleTheme = () =>
    setTheme((t) => (t === darkTheme ? lightTheme : darkTheme));

  const { sendMessage } = useChatSocket(chat.user, (msg) => {
    chat.appendMessage(msg);
  });

  const handleSendMessage = () => {
    if (
      !chat.message ||
      !chat.message.trim() ||
      !chat.selectedUser ||
      !chat.user
    )
      return;

    const msg = {
      sender_id: chat.user.id,
      receiver_id: chat.selectedUser.id,
      content: chat.message,
      time: new Date().toLocaleTimeString(),
    };

    chat.appendMessage(msg);
    sendMessage(msg);
    chat.setMessage("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {screen === "login" ? (
        <LoginScreen
          email={chat.email}
          setEmail={chat.setEmail}
          password={chat.password}
          setPassword={chat.setPassword}
          login={async () => {
            const res = await chat.login();
            if (res.success) goTo("userlist");
            else alert("Erro no login");
          }}
          setScreen={setScreen}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      ) : screen === "register" ? (
        <RegisterScreen
          name={chat.name}
          setName={chat.setName}
          email={chat.email}
          setEmail={chat.setEmail}
          password={chat.password}
          setPassword={chat.setPassword}
          role={chat.role}
          setRole={chat.setRole}
          register={async () => {
            const res = await chat.register();
            if (res.success) {
              alert("Cadastro feito!");
              goTo("login");
            } else {
              alert("Erro no cadastro");
            }
          }}
          setScreen={setScreen}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      ) : screen === "userlist" ? (
        <UserListScreen
          users={chat.users}
          selectUser={(u) => {
            chat.selectUser(u);
            goTo("chat");
          }}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      ) : (
        <ChatScreen
          selectedUser={chat.selectedUser}
          messages={chat.messages}
          user={chat.user}
          message={chat.message}
          setMessage={chat.setMessage}
          sendMessage={handleSendMessage}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
    </KeyboardAvoidingView>
  );
}
