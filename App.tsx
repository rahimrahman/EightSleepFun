import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Header, Users } from "./src/components/sleepReport";
import { useGetData } from "./src/hooks/useGetData";

function App(): React.JSX.Element {
  const [selectedUser, setSelectedUser] = React.useState("rahim");

  const [data] = useGetData(selectedUser);

  useEffect(() => {
    console.log({ data });
  }, [data]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.darkBackground}>
      <View>
        <Header />
        <Users onPress={setSelectedUser} />
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
