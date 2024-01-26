import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../common/constants";

type AvatarProps = {
  user: string;
  isSelected: boolean;
  onPress: (user: string) => void;
};

const imageUri = (name: string) => {
  switch (name) {
    case "zane":
      return require("../../assets/images/profilePhotos/zane.png");
    case "nora":
      return require("../../assets/images/profilePhotos/nora.png");
    case "rahim":
    default:
      return require("../../assets/images/profilePhotos/rahim.png");
  }
};

export const Avatar: React.FC<AvatarProps> = ({
  user = "rahim",
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      accessibilityLabel="button"
      onPress={() => onPress(user)}
      style={[
        styles.container,
        styles.imageSize,
        {
          borderColor: isSelected ? colors.primaryBlue : "white",
        },
      ]}
      testID={"Avatar-Button"}>
      <Image
        source={imageUri(user)}
        style={styles.imageSize}
        testID="Avatar-Image"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderRadius: 40,
    overflow: "hidden",
  },
  imageSize: {
    width: 80,
    height: 80,
  },
});
