import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import {
  BedAndRoomTemperatureChart,
  Header,
  Users,
} from "./src/components/sleepReport";
import { useGetData } from "./src/hooks/useGetData";
import { useParseData } from "./src/hooks/useParseData";
import { RespiratoryRateChart } from "./src/components/sleepReport/RespiratoryRateChart";
import { HeartRateChart } from "./src/components/sleepReport/HeartRateChart";

function App(): React.JSX.Element {
  const [selectedUser, setSelectedUser] = React.useState("rahim");

  const [data] = useGetData(selectedUser);
  const [
    bedAndRoomTemperatureChartData,
    respiratoryRateChartData,
    heartRateChartData,
  ] = useParseData(data);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.darkBackground}>
      <Header />
      <Users onPress={setSelectedUser} />

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
