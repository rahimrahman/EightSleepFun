import React, { FC, useEffect } from "react";
import { CircularProgressBar } from "../CircularProgressBar";
import { StyleSheet, View } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { TextSleepScorePercentage } from "./TextSleepScorePercentage";

type SleepScoreProps = {
  score: number;
};

const RADIUS = 100;
const STROKE_WIDTH = 10;

export const SleepScore: FC<SleepScoreProps> = ({ score }) => {
  return (
    <View style={styles.container}>
      <CircularProgressBar
        percentage={score}
        radius={RADIUS}
        strokeWidth={STROKE_WIDTH}>
        <TextSleepScorePercentage percentage={score} radius={RADIUS} />
      </CircularProgressBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: "center",
  },
});
