import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={theme.textMuted}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor={theme.textMuted}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("register")}>
        <Text style={{ color: theme.primary, marginTop: 10 }}>Criar conta</Text>
      </TouchableOpacity>

      {/* Botão Toggle Tema */}
      <TouchableOpacity style={{ marginTop: 20 }} onPress={toggleTheme}>
        <Text style={{ color: theme.textMuted }}>
          Alterar tema (Claro/Escuro)
        </Text>
      </TouchableOpacity>
    </View>
  );
}
