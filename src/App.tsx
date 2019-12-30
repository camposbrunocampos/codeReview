import React from "react"
import { SafeAreaView } from "react-navigation"

import AppNavigator from "./AppNavigator"
import styles from "./styles"
import { StatusBar } from "react-native";

const App = () => (
	<SafeAreaView style={styles.container}>
		<StatusBar barStyle={"dark-content"} />
		<AppNavigator />
	</SafeAreaView>
);

export default App