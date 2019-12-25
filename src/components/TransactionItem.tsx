import React from "react"
import { View, TouchableHighlight, Text } from "react-native"

import styles from "./../styles"
import { Colors } from "./../resources/index"

type Props = {
	transaction: any,
	onItemClicked?: () => any
}

export const TransactionItem = (props: Props) => {

	const { transaction, onItemClicked } = props
	const { merchant } = transaction

	const merchantName = merchant.name
	const merchantCategory = merchant.merchantCategory.name
	const formattedAmount = (transaction.amount / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })

	return (
		<TouchableHighlight
			onPress={onItemClicked}
			underlayColor={Colors.BACKGROUND_COLOR}>
			<View style={[styles.cardItemContainer, styles.row]}>
				<View style={styles.merchantInfoContainer}>
					<Text style={styles.merchantName}>{merchantName}</Text>
					<Text style={styles.descriptionText}>{merchantCategory}</Text>
				</View>
				<View style={styles.merchantAmountContainer}>
					<Text style={styles.transactionAmount}>{formattedAmount}</Text>
				</View>
			</View>
		</TouchableHighlight>
	)
}