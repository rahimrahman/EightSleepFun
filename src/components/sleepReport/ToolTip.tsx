import { Circle } from "@shopify/react-native-skia";
import React from "react";
import { SharedValue } from "react-native-reanimated";

type ToolTipProps = {
  x: SharedValue<number>;
  y: SharedValue<number>;
};

export const ToolTip: React.FC<ToolTipProps> = ({ x, y }) => {
  return <Circle cx={x} cy={y} r={4} color="white" />;
};
