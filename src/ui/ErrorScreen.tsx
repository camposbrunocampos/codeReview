import React from "react"
import { View, Text, Button } from "react-native"

import styles from "./../styles"
import { Strings, Colors } from "./../resources/index"

type Props = {
	onActionButtonClicked: () => any
}

export const ErrorScreen = (props: Props) => {

	const { onActionButtonClicked } = props

	return (
		<View style={styles.errorScreenContainer}>
			<Text style={styles.error}>{Strings.ERROR_MESSAGE}</Text>
			<Button
				color={Colors.HIGHLIGHT_COLOR}
				title={Strings.GO_BACK}
				onPress={() => onActionButtonClicked()} />
		</View>
	)
}