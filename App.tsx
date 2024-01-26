import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import {
  BedAndRoomTemperatureChart,
  Days,
  Header,
  HeartRateChart,
  Users,
  RespiratoryRateChart,
} from "./src/components/sleepReport";
import { useGetData } from "./src/hooks/useGetData";
import { useParseData } from "./src/hooks/useParseData";

function App(): React.JSX.Element {
  const [selectedUser, setSelectedUser] = useState("rahim");
  const [selectedInterval, setSelectedInterval] = useState<number>(0);
  const [data] = useGetData(selectedUser);
  const [
    bedAndRoomTemperatureChartData,
    respiratoryRateChartData,
    heartRateChartData,
    dataGroup,
  ] = useParseData(data, selectedInterval);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.darkBackground}>
      <Header />
      <Users onPress={setSelectedUser} />

      <Days dataGroup={dataGroup} onPress={setSelectedInterval} />

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
