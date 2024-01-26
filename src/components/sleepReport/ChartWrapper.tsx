import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ChartWrapperProps = {
  title: string;
  children: JSX.Element;
};
export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  title,
  children,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: "#1b1b1b",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 16,
  },
});
