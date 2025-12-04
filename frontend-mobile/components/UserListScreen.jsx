import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function UserListScreen({ users, selectUser }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione um usuário</Text>

      <FlatList
        data={users}
        keyExtractor={(u) => u.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => selectUser(item)}
          >
            <Text style={{ color: "#fff" }}>
              {item.name} ({item.role})
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20, paddingTop: 60 },
  title: { color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  userBtn: {
    padding: 15,
    backgroundColor: "#333",
    marginBottom: 10,
    borderRadius: 8,
  },
});
