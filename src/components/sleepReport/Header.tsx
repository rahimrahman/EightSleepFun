import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sleep report</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "600",
  },
});
