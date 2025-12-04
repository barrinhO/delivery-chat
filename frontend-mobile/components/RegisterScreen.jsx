import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

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
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Role: cliente ou atendente"
        value={role}
        onChangeText={setRole}
      />

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.btnText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("login")}>
        <Text style={{ color: "#00f" }}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20, paddingTop: 60 },
  title: { color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#0f0",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  btnText: { color: "#000", fontWeight: "bold" },
});
