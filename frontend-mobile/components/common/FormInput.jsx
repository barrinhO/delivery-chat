import React from "react";
import { TextInput } from "react-native";
import { globalStyles } from "../../styles/global";

export default function FormInput({
  theme,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
}) {
  const styles = globalStyles(theme);

  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={theme.textMuted}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
    />
  );
}
