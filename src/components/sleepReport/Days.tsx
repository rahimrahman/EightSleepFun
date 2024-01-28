import React, { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CircularProgressBar } from "../CircularProgressBar";

export type DataGroup = {
  [key: string]: {
    id: string;
    index: number;
    score: number;
  };
};

export type DayOfWeekData = {
  id: string;
  index: number;
  score: number;
};

export type DayOfWeekSummaryData = {
  [dayOfWeek: string]: DayOfWeekData;
};

type DaysProps = {
  data: DayOfWeekSummaryData;
  onPress: (i: number) => void;
};

const DAYS_MAP = ["S", "M", "T", "W", "R", "F", "S"];

export const Days: FC<DaysProps> = ({ data, onPress }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const onDayPress = (dayOfWeek: number | undefined) => {
    if (dayOfWeek) {
      const intervalIndex = data[dayOfWeek].index;
      setSelectedDayIndex(intervalIndex);
      onPress(dayOfWeek);
    }
  };

  return (
    <View style={styles.container}>
      {DAYS_MAP.map((day, i: number) => (
        <Day
          key={i}
          title={day}
          onPress={() => onDayPress(i)}
          score={data[i]?.score}
          isSelected={selectedDayIndex === data[i]?.index ? true : false}
        />
      ))}
    </View>
  );
};

type DayProps = {
  title: string;
  score?: number;
  isSelected: boolean;
  onPress: () => void;
};

const Day: FC<DayProps> = ({ title, score, isSelected = false, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.daySquareDimension}
      onPress={onPress}
      disabled={score ? false : true}>
      <CircularProgressBar
        percentage={score || 0}
        strokeWidth={2}
        radius={20}
        disabled={score ? false : true}
      />
      <View style={[styles.daySquareDimension, styles.textContainer]}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    paddingVertical: 8,
  },
  daySquareDimension: {
    width: 40,
    height: 40,
  },
  textContainer: {
    position: "absolute",
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
