import React, { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";

import { Header } from "./src/components/sleepReport/Header";
import { Users } from "./src/components/sleepReport/Users";

function App(): React.JSX.Element {
  const [selectedUser, setSelectedUser] = React.useState("rahim");

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
