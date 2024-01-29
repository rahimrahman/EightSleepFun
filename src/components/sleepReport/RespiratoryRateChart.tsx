import { useFont } from "@shopify/react-native-skia";
import React from "react";
import { CartesianChart, Line, useChartPressState } from "victory-native";

import { ToolTip } from "./ToolTip";
import { ChartWrapper } from "./ChartWrapper";
import inter from "../../../assets/fonts/Inter-Medium.ttf";

export type RespiratoryRateChartData = {
  xKey: string;
  respiratoryHeartRate: number;
};
type RespiratoryRateChartProps = {
  chartData: RespiratoryRateChartData[];
};

const INIT_STATE = {
  x: "0",
  y: { respiratoryHeartRate: 0 },
};

export const RespiratoryRateChart: React.FC<RespiratoryRateChartProps> = ({
  chartData,
}) => {
  const font = useFont(inter, 14);
  const { state, isActive } = useChartPressState(INIT_STATE);

  if (!chartData.length) {
    return null;
  }

  return (
    <ChartWrapper title={"Respiratory Rate"}>
      <CartesianChart
        data={chartData}
        xKey="xKey"
        yKeys={["respiratoryHeartRate"]}
        chartPressState={state}
        axisOptions={{
          tickCount: {
            x: 2,
            y: 2,
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
              points={points.respiratoryHeartRate}
              color="white"
              strokeWidth={3}
              // curveType="natural"
              connectMissingData
              animate={{ type: "timing", duration: 300 }}
            />
            {isActive ? (
              <>
                <ToolTip
                  x={state.x.position}
                  y={state.y.respiratoryHeartRate.position}
                />
              </>
            ) : null}
          </>
        )}
      </CartesianChart>
    </ChartWrapper>
  );
};
