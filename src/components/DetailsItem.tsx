import React from "react"
import { View, Text } from "react-native"

import styles from "./../styles"
import { Strings } from "./../resources/index"

type Props = {
	transaction: any
}

export const DetailsItem = (props: Props) => {

	const { transaction } = props

	const purchaseDateTime = new Date(transaction.purchaseTime)
	//This could be done with the moment.js library
	const month = purchaseDateTime.toLocaleString('default', { month: 'short' })
	const day = purchaseDateTime.getDay()
	const time = purchaseDateTime.toLocaleTimeString([], { timeStyle: 'short' })
	const formattedPurchaseDateTime = month + " " + day + ", " + time

	return (
		<View style={styles.cardItemContainer}>
			<Text style={styles.detailsTitle}>{Strings.DETAILS}</Text>
			<View style={styles.itemDetailsLine}>
				<Text style={styles.descriptionText}>{Strings.PURCHASED_AT}</Text>
				<Text style={[styles.descriptionText, styles.detailsDescription]}>{formattedPurchaseDateTime}</Text>
			</View>
			<View style={styles.itemDetailsLine}>
				<Text style={styles.descriptionText}>{Strings.MERCHANT_NAME}</Text>
				<Text style={[styles.descriptionText, styles.detailsDescription]}>{transaction.merchant.name}</Text>
			</View>
			<View style={styles.itemDetailsLine}>
				<Text style={styles.descriptionText}>{Strings.WEBSITE}</Text>
				<Text style={[styles.descriptionText, styles.detailsHighlight]}>{transaction.merchant.website}</Text>
			</View>
		</View>
	)
}