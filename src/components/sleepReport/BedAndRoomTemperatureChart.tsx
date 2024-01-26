import { useFont } from "@shopify/react-native-skia";
import React from "react";
import { CartesianChart, Line, useChartPressState } from "victory-native";

import { ToolTip } from "./ToolTip";
import inter from "../../../assets/fonts/Inter-Medium.ttf";
import { ChartWrapper } from "./ChartWrapper";

const INIT_STATE = {
  x: "0",
  y: { temperatureRoomCelsius: 0, temperatureBedCelsius: 0 },
};

export type BedAndRoomTemperatureChartData = {
  xKey: string;
  temperatureRoomCelsius: number;
  temperatureRoomFahrenheit: number;
  temperatureBedCelsius: number;
  temperatureBedFahrenheit: number;
};
type BedAndRoomTemperatureChartProps = {
  chartData: BedAndRoomTemperatureChartData[] | [];
};

export const BedAndRoomTemperatureChart: React.FC<
  BedAndRoomTemperatureChartProps
> = ({ chartData }) => {
  if (!chartData.length) {
    return null;
  }
  const { state, isActive } = useChartPressState(INIT_STATE);
  const font = useFont(inter, 14);

  return (
    <ChartWrapper title="Room & Bed Temperature">
      <CartesianChart
        data={chartData}
        xKey="xKey"
        yKeys={["temperatureRoomCelsius", "temperatureBedCelsius"]}
        chartPressState={state}
        axisOptions={{
          tickCount: {
            x: 2,
            y: 4,
          },
          font,
          lineColor: "#525252",
          labelColor: "#525252",
          labelOffset: {
            x: 8,
            y: 8,
          },
          // labelPosition: "inset",
        }}>
        {({ points }) => (
          <>
            <Line
              points={points.temperatureRoomCelsius}
              color="white"
              strokeWidth={3}
              curveType="natural"
              connectMissingData
              animate={{ type: "timing", duration: 300 }}
            />
            <Line
              points={points.temperatureBedCelsius}
              color="gray"
              strokeWidth={3}
              curveType="natural"
              connectMissingData
              animate={{ type: "timing", duration: 300 }}
            />
            {isActive ? (
              <>
                <ToolTip
                  x={state.x.position}
                  y={state.y.temperatureRoomCelsius.position}
                />
                <ToolTip
                  x={state.x.position}
                  y={state.y.temperatureBedCelsius.position}
                />
              </>
            ) : null}
          </>
        )}
      </CartesianChart>
    </ChartWrapper>
  );
};
