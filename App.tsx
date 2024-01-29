import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import {
  BedAndRoomTemperatureChart,
  Days,
  Header,
  HeartRateChart,
  Users,
  RespiratoryRateChart,
  SleepStagesChart,
} from "./src/components/sleepReport";
import { useGetData } from "./src/hooks/useGetData";
import { useParseData } from "./src/hooks/useParseData";
import { SleepScore } from "./src/components/sleepReport/SleepScore";

function App(): React.JSX.Element {
  const [selectedUser, setSelectedUser] = useState("rahim");

  const [selectedInterval, setSelectedInterval] = useState<number>(0);
  const [sleepScore, setSleepScore] = useState(0);

  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<
    number | undefined
  >();

  const [data] = useGetData(selectedUser);
  const [
    sleepStagesChartData,
    bedAndRoomTemperatureChartData,
    respiratoryRateChartData,
    heartRateChartData,
    dayOfWeekSummaryData,
  ] = useParseData(data, selectedInterval);

  React.useEffect(() => {
    if (selectedDayOfWeek) {
      const { score, index } = dayOfWeekSummaryData[selectedDayOfWeek];

      setSleepScore(score);
      setSelectedInterval(index);
    } else {
      const dayOfWeekSummaryDataKeys = Object.keys(dayOfWeekSummaryData);

      if (dayOfWeekSummaryDataKeys.length) {
        const lastInTheList =
          dayOfWeekSummaryDataKeys[dayOfWeekSummaryDataKeys.length - 1];
        const { score, index } = dayOfWeekSummaryData[lastInTheList];
        setSleepScore(score);
        setSelectedInterval(index);
      }
    }
  }, [dayOfWeekSummaryData, selectedDayOfWeek]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.darkBackground}>
      <Header />
      <Users onPress={setSelectedUser} />

      <Days data={dayOfWeekSummaryData} onPress={setSelectedDayOfWeek} />

      <SleepScore score={sleepScore} />

      <SleepStagesChart chartData={sleepStagesChartData} />

      <BedAndRoomTemperatureChart chartData={bedAndRoomTemperatureChartData} />

      <RespiratoryRateChart chartData={respiratoryRateChartData} />

      <HeartRateChart chartData={heartRateChartData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  darkBackground: {
    backgroundColor: "#000000",
  },
});

export default App;
