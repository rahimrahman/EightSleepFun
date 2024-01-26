import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import {
  BedAndRoomTemperatureChart,
  BedAndRoomTemperatureChartData,
  Header,
  Users,
} from "./src/components/sleepReport";
import { useGetData } from "./src/hooks/useGetData";
import { celsiusToFahrenheit, hoursDisplay } from "./src/common/helpers";
import { useParseData } from "./src/hooks/useParseData";
import { RespiratoryRateChart } from "./src/components/sleepReport/RespiratoryRateChart";

function App(): React.JSX.Element {
  const [selectedUser, setSelectedUser] = React.useState("rahim");

  const [data] = useGetData(selectedUser);
  const [bedAndRoomTemperatureChartData, respiratoryRateChartData] =
    useParseData(data);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.darkBackground}>
      <View>
        <Header />
        <Users onPress={setSelectedUser} />

        <BedAndRoomTemperatureChart
          chartData={bedAndRoomTemperatureChartData}
        />

        <RespiratoryRateChart chartData={respiratoryRateChartData} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  darkBackground: {
    backgroundColor: "#000000",
  },
});

export default App;
