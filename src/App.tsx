import React from "react";

import { Text, View } from "react-native";

import styles from "./styles";

const App = () => (
  <View testID="app-container" style={styles.container}>
    <Text>I'm alive</Text>
  </View>
);

export default App;
