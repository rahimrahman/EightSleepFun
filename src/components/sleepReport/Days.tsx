import React, { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../common/constants";

export type DataGroup = {
  [key: string]: {
    id: string;
    index: number;
    score: number;
  };
};
type DaysProps = {
  dataGroup: DataGroup;
  onPress: (i: number) => void;
};

const DAYS_MAP = ["S", "M", "T", "W", "R", "F", "S"];

export const Days: FC<DaysProps> = ({ dataGroup, onPress }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const onDayPress = (index: number | undefined) => {
    if (typeof index === "number" && index >= 0) {
      onPress(index);
      setSelectedDayIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      {[...Array(7)].map((_e, i: number) => (
        <Day
          key={i}
          title={DAYS_MAP[i]}
          onPress={() => onDayPress(dataGroup[i]?.index)}
          score={dataGroup[i]?.score}
          isSelected={selectedDayIndex === dataGroup[i]?.index ? true : false}
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
      style={[
        styles.cell,
        {
          borderColor: isSelected
            ? colors.primaryBlue
            : score
            ? "white"
            : "#525252",
        },
      ]}
      onPress={onPress}
      disabled={isSelected || score ? false : true}>
      <Text style={styles.text}>{title}</Text>
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
  cell: {
    width: 40,
    height: 40,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
