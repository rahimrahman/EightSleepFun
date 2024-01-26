import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar } from "../Avatar";

type UsersProps = {
  onPress: (user: string) => void;
};
export const Users: React.FC<UsersProps> = ({ onPress }) => {
  const [selectedUser, setSelectedUser] = React.useState("rahim");

  const isSelectedUser = (user: string) =>
    selectedUser === user ? true : false;

  const onAvatarPressed = (user: string) => {
    onPress(user);
    setSelectedUser(user);
  };

  return (
    <View style={styles.container}>
      {["rahim", "nora", "zane"].map(user => (
        <Avatar
          key={user}
          user={user}
          isSelected={isSelectedUser(user)}
          onPress={() => onAvatarPressed(user)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    paddingVertical: 16,
  },
});
