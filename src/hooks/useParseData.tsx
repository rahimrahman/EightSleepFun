import React, { useEffect, useState } from "react";
import {
  BedAndRoomTemperatureChartData,
  RespiratoryRateChartData,
  HeartRateChartData,
  DataGroup,
} from "../components/sleepReport";
import { celsiusToFahrenheit, hoursDisplay } from "../common/helpers";
import { ResponseData } from "./useGetData";

export const useParseData = (
  data: ResponseData = { intervals: [] },
  selectedInterval: number
) => {
  const [bedAndRoomTemperatureChartData, setBedAndRoomTemperatureChartData] =
    useState<BedAndRoomTemperatureChartData[]>([]);

  const [respiratoryRateChartData, setRespiratoryRatechartData] = useState<
    RespiratoryRateChartData[]
  >([]);

  const [heartRateChartData, setHeartRateChartData] = useState<
    HeartRateChartData[]
  >([]);

  const [dataGroup, setDataGroup] = useState<DataGroup>({});

  useEffect(() => {
    const { intervals } = data;

    if (intervals.length) {
      const group: DataGroup = intervals.reduce(
        (acc: Record<number, any>, { id, ts, score }, index: number) => {
          const dayOfTheWeek = new Date(ts).getDay();

          acc[dayOfTheWeek] = {
            index,
            id,
            score,
          };

          return acc;
        },
        {}
      );

      setDataGroup(group);

      const { timeseries } = intervals[selectedInterval];
      const { tempRoomC, tempBedC, respiratoryRate, heartRate } = timeseries;

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

      const respiratoryRateData = respiratoryRate.map(([datetime, value]) => ({
        xKey: hoursDisplay(datetime),
        respiratoryHeartRate: value,
      }));

      setRespiratoryRatechartData(respiratoryRateData);

      const heartRateData = heartRate.map(([datetime, value]) => {
        return {
          xKey: hoursDisplay(datetime),
          heartRate: value,
        };
      });

      setHeartRateChartData(heartRateData);
    }
  }, [data, selectedInterval, setBedAndRoomTemperatureChartData]);

  return [
    bedAndRoomTemperatureChartData,
    respiratoryRateChartData,
    heartRateChartData,
    dataGroup,
  ] as [
    BedAndRoomTemperatureChartData[],
    RespiratoryRateChartData[],
    HeartRateChartData[],
    DataGroup
  ];
};
