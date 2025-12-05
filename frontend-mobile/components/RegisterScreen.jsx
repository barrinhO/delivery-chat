import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";

export default function RegisterScreen({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  role,
  setRole,
  register,
  setScreen,
  theme,
  toggleTheme,
}) {
  const styles = globalStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor={theme.textMuted}
        value={name}
        onChangeText={setName}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Role: cliente ou atendente"
        placeholderTextColor={theme.textMuted}
        value={role}
        onChangeText={setRole}
      />

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.btnText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("login")}>
        <Text style={{ color: theme.primary, marginTop: 10 }}>Voltar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 20 }} onPress={toggleTheme}>
        <Text style={{ color: theme.textMuted }}>Alterar Tema</Text>
      </TouchableOpacity>
    </View>
  );
}
