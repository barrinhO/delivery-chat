import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";

export default function UserListScreen({
  users,
  selectUser,
  theme,
  toggleTheme,
}) {
  const styles = globalStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione um Usuário</Text>

      <FlatList
        data={users}
        keyExtractor={(u) => u.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => selectUser(item)}
          >
            <Text style={{ color: theme.text }}>
              {item.name} ({item.role})
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={{ marginTop: 20 }} onPress={toggleTheme}>
        <Text style={{ color: theme.textMuted }}>Alterar Tema</Text>
      </TouchableOpacity>
    </View>
  );
  a;
}
