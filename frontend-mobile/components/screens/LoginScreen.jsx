import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { globalStyles } from "../../styles/global";
import { loginStyles } from "../../styles/screens/loginStyles";
import FormInput from "../common/FormInput";
import PrimaryButton from "../common/PrimaryButton";
import ThemeToggle from "../common/ThemeToggle";

export default function LoginScreen({
  email,
  setEmail,
  password,
  setPassword,
  login,
  setScreen,
  theme,
  toggleTheme,
}) {
  const styles = globalStyles(theme);
  const s = loginStyles(theme);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Text style={styles.title}>Login</Text>

        <View style={s.formContainer}>
          <FormInput
            theme={theme}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <FormInput
            theme={theme}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <PrimaryButton theme={theme} label="Entrar" onPress={login} />
        </View>

        <TouchableOpacity onPress={() => setScreen("register")}>
          <Text style={s.link}>Criar conta</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 22 }}>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
