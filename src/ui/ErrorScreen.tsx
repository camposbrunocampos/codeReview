import React from "react"
import { View, Text, Button } from "react-native"

import styles from "./../styles"
import { Strings, Colors } from "./../resources/index"

type Props = {
	errorName: string,
	onActionButtonClicked: () => any
}

export const ErrorScreen = (props: Props) => {

	const { errorName, onActionButtonClicked } = props

	return (
		<View style={styles.errorScreenContainer}>
			<Text>{errorName}</Text>
			<Button
				color={Colors.HIGHLIGHT_COLOR}
				title={Strings.TRY_AGAIN}
				onPress={() => onActionButtonClicked()} />
		</View>
	)
}