import React from "react"
import { View, Text, Button } from "react-native"

import { Strings, Colors } from "./../resources/index"
import styles from "./../styles"

type Props = {
	errorMessage: string,
	errorButton: string,
	onActionButtonClicked: () => any
}

export const ErrorScreen = (props: Props) => {

	const { errorMessage, errorButton, onActionButtonClicked } = props

	return (
		<View style={styles.errorScreenContainer}>
			<Text style={styles.errorTitle}>{Strings.ERROR_TITLE}</Text>
			<Text>{errorMessage}</Text>
			<Button
				color={Colors.HIGHLIGHT_COLOR}
				title={errorButton}
				onPress={onActionButtonClicked} />
		</View>
	)
}