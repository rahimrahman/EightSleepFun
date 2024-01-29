import React, { FC } from "react";
import { ChartWrapper } from "./ChartWrapper";
import { CartesianChart, Line, useChartPressState } from "victory-native";

import { getFontProperties } from "../../common/helpers";
import { matchFont } from "@shopify/react-native-skia";
import { ToolTip } from "./ToolTip";

export type SleepStagesChartData = {
  xKey: string;
  value: number;
};

type SleepStagesChartProps = {
  chartData: SleepStagesChartData[];
};

const textFontStyle = getFontProperties(14, "normal", "400");
const font = matchFont(textFontStyle);

const INIT_STATE = {
  x: "0",
  y: { value: 0 },
};

export const SleepStagesChart: FC<SleepStagesChartProps> = ({ chartData }) => {
  const { state, isActive } = useChartPressState(INIT_STATE);

  if (!chartData.length) {
    return null;
  }

  return (
    <ChartWrapper title="Sleep Stages">
      <CartesianChart
        data={chartData}
        xKey="xKey"
        yKeys={["value"]}
        chartPressState={state}
        domainPadding={{ top: 5 }}
        axisOptions={{
          tickCount: {
            x: 4,
            y: 4,
          },
          font,
          lineColor: "#525252",
          labelColor: "#525252",
          labelOffset: {
            x: 8,
            y: 8,
          },
          formatYLabel: (label: number) => {
            switch (label) {
              case 300000:
                return "Deep";
              case 200000:
                return "Light";
              case 100000:
                return "Awake";
              case 0:
                return "Out";
              default:
                return "";
            }
          },
        }}>
        {({ points }) => (
          <>
            <Line
              points={points.value}
              color="white"
              strokeWidth={3}
              curveType="step"
              animate={{ type: "timing", duration: 300 }}
            />
            {isActive ? (
              <>
                <ToolTip x={state.x.position} y={state.y.value.position} />
                <ToolTip x={state.x.position} y={state.y.value.position} />
              </>
            ) : null}
          </>
        )}
      </CartesianChart>
    </ChartWrapper>
  );
};
