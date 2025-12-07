import React from "react";
import { View, Text, FlatList } from "react-native";
import { globalStyles } from "../../styles/global";
import { userListStyles } from "../../styles/screens/userListStyles";
import UserItem from "../common/UserItem";
import ThemeToggle from "../common/ThemeToggle";

export default function UserListScreen({
  users,
  selectUser,
  theme,
  toggleTheme,
}) {
  const styles = globalStyles(theme);
  const s = userListStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversas</Text>

      <FlatList
        style={s.list}
        data={users}
        keyExtractor={(u) => u.id}
        renderItem={({ item }) => (
          <UserItem
            theme={theme}
            user={item}
            onPress={() => selectUser(item)}
          />
        )}
      />

      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </View>
  );
}
