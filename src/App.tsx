import React from "react"
import { SafeAreaView } from "react-native"

import AppNavigator from "./AppNavigator"
import styles from "./styles"

const App = () => (
	<SafeAreaView style={styles.container}>
		<AppNavigator />
	</SafeAreaView>
);

export default App