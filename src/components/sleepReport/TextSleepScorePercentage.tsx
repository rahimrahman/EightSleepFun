import { Group, Text, matchFont, vec } from "@shopify/react-native-skia";
import React, { FC, useEffect } from "react";

import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { getFontProperties } from "../../common/helpers";

type TextSleepScorePercentageProps = {
  radius: number;
  percentage: number;
};

const percentageTextFontStyle = getFontProperties(80, "normal", "600");
const percentageTextFont = matchFont(percentageTextFontStyle);

const percentageSignFontStyle = getFontProperties(16, "normal", "600");
const percentageSignFont = matchFont(percentageSignFontStyle);

export const TextSleepScorePercentage: FC<TextSleepScorePercentageProps> = ({
  radius,
  percentage,
}) => {
  const percentageNumber = useSharedValue(0);
  useEffect(() => {
    percentageNumber.value = withTiming(percentage, { duration: 1000 });
  }, [percentage]);

  const targetText = useDerivedValue(
    () => `${Math.round(percentageNumber.value)}`,
    []
  );

  const fontSize = percentageTextFont.measureText("00");

  const percentageTextX = useDerivedValue(() => {
    const percentageTextFontSize = percentageTextFont.measureText(
      targetText.value
    );
    const percentageSignFontSize = percentageSignFont.measureText("%");

    return (
      radius -
      percentageTextFontSize.width / 2 -
      percentageSignFontSize.width / 2
    );
  }, []);

  const percentageSignTextX = useDerivedValue(() => {
    const percentageTextFontSize = percentageTextFont.measureText(
      targetText.value
    );

    return radius + percentageTextFontSize.width / 2 - 5;
  });

  return (
    <Group transform={[{ rotate: Math.PI / 2 }]} origin={vec(radius, radius)}>
      <Text
        x={percentageTextX}
        y={radius + fontSize.height / 2}
        text={targetText}
        font={percentageTextFont}
        color="white"
      />
      <Text
        x={percentageSignTextX}
        y={radius + fontSize.height / 2}
        text={"%"}
        font={percentageSignFont}
        color="white"
      />
    </Group>
  );
};
