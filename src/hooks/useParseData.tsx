import React, { useEffect, useState } from "react";
import { BedAndRoomTemperatureChartData } from "../components/sleepReport";
import { celsiusToFahrenheit, hoursDisplay } from "../common/helpers";

export const useParseData = (data: unknown = { intervals: [] }) => {
  const [bedAndRoomTemperatureChartData, setBedAndRoomTemperatureChartData] =
    useState([]);

  useEffect(() => {
    const { intervals } = data;

    if (intervals.length) {
      const { tempRoomC, tempBedC } = intervals[0].timeseries;

      const bedAndRoomTemperature: BedAndRoomTemperatureChartData[] =
        tempRoomC.map(
          (
            [datetime, temperature]: [datetime: string, temperature: number],
            index: number
          ) => ({
            xKey: hoursDisplay(datetime as string),
            temperatureRoomCelsius: temperature as number,
            temperatureRoomFahrenheit: celsiusToFahrenheit(
              temperature as number
            ),
            temperatureBedCelsius: tempBedC[index][1] as number,
            temperatureBedFahrenheit: celsiusToFahrenheit(
              tempBedC[index][1] as number
            ),
          })
        );

      setBedAndRoomTemperatureChartData(bedAndRoomTemperature);
    }
  }, [data, setBedAndRoomTemperatureChartData]);

  return [bedAndRoomTemperatureChartData];
};
