import { StyleSheet, View } from "react-native";
import React, { useEffect, useMemo } from "react";
import { Canvas, Path, SkFont, Skia } from "@shopify/react-native-skia";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { colors } from "../common/constants";

type Props = {
  percentage: number;
  strokeWidth: number;
  radius: number;
  disabled?: boolean;
  disabledColor?: string;
  children?: JSX.Element;
};

export const CircularProgressBar = ({
  percentage,
  radius,
  strokeWidth,
  disabled = false,
  disabledColor = colors.primaryGray,
  children,
}: Props) => {
  const end = useSharedValue(0);

  useEffect(() => {
    end.value = withTiming(percentage / 100, { duration: 1000 });
  });
  const path = useMemo(() => {
    const innerRadius = radius - strokeWidth / 2;

    const p = Skia.Path.Make();
    p.addCircle(radius, radius, innerRadius);

    return p;
  }, [radius, strokeWidth]);

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        transform: [{ rotate: "-90deg" }],
      }}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          strokeWidth={strokeWidth}
          color={disabled ? disabledColor : colors.secondaryBlue}
          style="stroke"
          strokeJoin="round"
          strokeCap="round"
          start={0}
          end={1}
        />
        <Path
          path={path}
          strokeWidth={strokeWidth}
          color={colors.primaryBlue}
          style="stroke"
          strokeJoin="round"
          strokeCap="round"
          end={end}
        />
        {children}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
