import { useEffect, useState } from "react";
import {
  BedAndRoomTemperatureChartData,
  RespiratoryRateChartData,
  HeartRateChartData,
  DayOfWeekSummaryData,
  SleepStagesChartData,
} from "../components/sleepReport";
import { celsiusToFahrenheit, hoursDisplay } from "../common/helpers";
import { ResponseData } from "./useGetData";
import { Platform } from "react-native";

const MILISECONDS_OFFSET = Platform.select({ ios: 1000, default: 1 });
const STAGES_MAP = {
  deep: 300000,
  light: 200000,
  awake: 100000,
  out: 0,
};

export const useParseData = (
  data: ResponseData = { intervals: [] },
  selectedIntervalIndex: number
) => {
  const [sleepStagesChartData, setSleepStagesChartData] = useState<
    SleepStagesChartData[]
  >([]);

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
      const { timeseries, stages, ts } = intervals[internalIntervalIndex];

      let lastDateTime = new Date(ts);
      const stagesData = stages.map(({ stage, duration }) => {
        lastDateTime = new Date(
          lastDateTime.getTime() + duration * MILISECONDS_OFFSET
        );

        return {
          xKey: hoursDisplay(lastDateTime.toString()),
          value: STAGES_MAP[stage],
        };
      });

      setSleepStagesChartData([
        { xKey: hoursDisplay(ts), value: 0 },
        ...stagesData,
      ]);

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
    sleepStagesChartData,
    bedAndRoomTemperatureChartData,
    respiratoryRateChartData,
    heartRateChartData,
    dayOfWeekSummaryData,
  ] as [
    SleepStagesChartData[],
    BedAndRoomTemperatureChartData[],
    RespiratoryRateChartData[],
    HeartRateChartData[],
    DayOfWeekSummaryData
  ];
};
