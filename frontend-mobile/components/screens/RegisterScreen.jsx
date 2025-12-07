import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/global";
import { registerStyles } from "../../styles/screens/registerStyles";
import FormInput from "../common/FormInput";
import PrimaryButton from "../common/PrimaryButton";
import ThemeToggle from "../common/ThemeToggle";

export default function RegisterScreen({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  register,
  setScreen,
  theme,
  toggleTheme,
}) {
  const styles = globalStyles(theme);
  const s = registerStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <FormInput
        theme={theme}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <FormInput
        theme={theme}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <FormInput
        theme={theme}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <PrimaryButton theme={theme} label="Cadastrar" onPress={register} />

      <TouchableOpacity onPress={() => setScreen("login")}>
        <Text style={s.link}>Já tenho conta</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </View>
    </View>
  );
}
