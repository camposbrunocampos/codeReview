import React from "react"
import { View, TouchableHighlight, Text } from "react-native"

import styles from "./../styles"
import { Colors } from "./../resources/index"

require('intl')
require('intl/locale-data/jsonp/en-US')

type Props = {
	transaction: any,
	onItemClicked?: () => any
}

export const TransactionItem = (props: Props) => {

	const { transaction, onItemClicked } = props
	const { merchant } = transaction

	const merchantName = merchant.name
	const merchantCategory = merchant.merchantCategory.name

	//This could be done through ".toLocaleString", setting the currency and style just like this option below,
	//but that is not supported in Android because of its version of JavaScriptCore (outdated). It could also be
	//done by regex, but I believe it's a cleaner and more sustainable option to use the 'Intl' dependency.
	const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((transaction.amount) / 100)

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