import { useFont } from "@shopify/react-native-skia";
import React from "react";
import { CartesianChart, Line, useChartPressState } from "victory-native";

import { ToolTip } from "./ToolTip";
import { ChartWrapper } from "./ChartWrapper";
import inter from "../../../assets/fonts/Inter-Medium.ttf";

export type HeartRateChartData = {
  xKey: string;
  heartRate: number;
};
type HeartRateChartProps = {
  chartData: HeartRateChartData[];
};

const INIT_STATE = {
  x: "0",
  y: { heartRate: 0 },
};

export const HeartRateChart: React.FC<HeartRateChartProps> = ({
  chartData,
}) => {
  const font = useFont(inter, 14);
  const { state, isActive } = useChartPressState(INIT_STATE);

  if (!chartData.length) {
    return null;
  }

  return (
    <ChartWrapper title="Heart Rate">
      <CartesianChart
        data={chartData}
        xKey="xKey"
        yKeys={["heartRate"]}
        chartPressState={state}
        axisOptions={{
          tickCount: {
            x: 3,
            y: 5,
          },
          font,
          lineColor: "#525252",
          labelColor: "#525252",
          labelOffset: {
            x: 8,
            y: 8,
          },
        }}>
        {({ points }) => (
          <>
            <Line
              points={points.heartRate}
              color="white"
              strokeWidth={2}
              connectMissingData
              animate={{ type: "timing", duration: 300 }}
            />
            {isActive ? (
              <>
                <ToolTip x={state.x.position} y={state.y.heartRate.position} />
              </>
            ) : null}
          </>
        )}
      </CartesianChart>
    </ChartWrapper>
  );
};
