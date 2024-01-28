import React, { useEffect, useState } from "react";
import {
  BedAndRoomTemperatureChartData,
  RespiratoryRateChartData,
  HeartRateChartData,
  DayOfWeekSummaryData,
  DayOfWeekData,
} from "../components/sleepReport";
import { celsiusToFahrenheit, hoursDisplay } from "../common/helpers";
import { ResponseData } from "./useGetData";

export const useParseData = (
  data: ResponseData = { intervals: [] },
  selectedIntervalIndex: number
) => {
  const [bedAndRoomTemperatureChartData, setBedAndRoomTemperatureChartData] =
    useState<BedAndRoomTemperatureChartData[]>([]);

  const [respiratoryRateChartData, setRespiratoryRatechartData] = useState<
    RespiratoryRateChartData[]
  >([]);

  const [heartRateChartData, setHeartRateChartData] = useState<
    HeartRateChartData[]
  >([]);

  const [dayOfWeekSummaryData, setDayOfWeekSummaryData] =
    useState<DayOfWeekSummaryData>({});

  const [internalIntervalIndex, setInternalIntervalIndex] = useState(0);

  useEffect(() => {
    if (typeof selectedIntervalIndex === "number") {
      setInternalIntervalIndex(selectedIntervalIndex);
    }
  }, [selectedIntervalIndex]);

  useEffect(() => {
    const { intervals } = data;

    if (intervals.length) {
      const dayOfWeekSummary: DayOfWeekSummaryData = intervals.reduce(
        (acc: Record<number, any>, { id, ts, score }, index: number) => {
          const dayOfTheWeek = new Date(ts).getUTCDay();

          acc[dayOfTheWeek] = {
            index,
            id,
            score,
          };

          return acc;
        },
        {}
      );

      setDayOfWeekSummaryData(dayOfWeekSummary);
      // when we switch to new user, reset to the last day of the week, thus setting for last interval
      setInternalIntervalIndex(intervals.length - 1);
    }
  }, [data]);

  useEffect(() => {
    const { intervals } = data;

    if (intervals.length) {
      const { timeseries } = intervals[internalIntervalIndex];
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
  }, [data, internalIntervalIndex]);

  return [
    bedAndRoomTemperatureChartData,
    respiratoryRateChartData,
    heartRateChartData,
    dayOfWeekSummaryData,
  ] as [
    BedAndRoomTemperatureChartData[],
    RespiratoryRateChartData[],
    HeartRateChartData[],
    DayOfWeekSummaryData
  ];
};
