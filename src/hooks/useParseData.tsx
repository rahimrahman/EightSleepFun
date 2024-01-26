import React, { useEffect, useState } from "react";
import { BedAndRoomTemperatureChartData } from "../components/sleepReport";
import { celsiusToFahrenheit, hoursDisplay } from "../common/helpers";
import { RespiratoryRateChartData } from "../components/sleepReport/RespiratoryRateChart";
import { HeartRateChartData } from "../components/sleepReport/HeartRateChart";

export const useParseData = (data: unknown = { intervals: [] }) => {
  const [bedAndRoomTemperatureChartData, setBedAndRoomTemperatureChartData] =
    useState([]);
  const [respiratoryRateChartData, setRespiratoryRatechartData] = useState([]);
  const [heartRateChartData, setHeartRateChartData] = useState([]);

  useEffect(() => {
    const { intervals } = data;

    if (intervals.length) {
      const { tempRoomC, tempBedC, respiratoryRate, heartRate } =
        intervals[0].timeseries;

      const bedAndRoomTemperatureData: BedAndRoomTemperatureChartData[] =
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

      setBedAndRoomTemperatureChartData(bedAndRoomTemperatureData);

      const respiratoryRateData: RespiratoryRateChartData = respiratoryRate.map(
        ([datetime, value]: [datetime: string, temperature: number]) => ({
          xKey: hoursDisplay(datetime as string),
          respiratoryHeartRate: value,
        })
      );

      setRespiratoryRatechartData(respiratoryRateData);

      const heartRateData: HeartRateChartData = heartRate.map(
        ([datetime, value]: [datetime: string, temperature: number]) => {
          return {
            xKey: hoursDisplay(datetime as string),
            xAxisLabel: datetime as string,
            heartRate: value,
          };
        }
      );

      setHeartRateChartData(heartRateData);
    }
  }, [data, setBedAndRoomTemperatureChartData]);

  return [
    bedAndRoomTemperatureChartData,
    respiratoryRateChartData,
    heartRateChartData,
  ];
};
