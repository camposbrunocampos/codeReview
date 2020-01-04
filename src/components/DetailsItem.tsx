import React from "react"
import { View, Text } from "react-native"

import { Strings } from "./../resources/index"
import styles from "./../styles"

type Props = {
	transaction: any
}

export const DetailsItem = (props: Props) => {

	const { transaction } = props

	const purchaseDateTime = new Date(transaction.purchaseTime)
	//This formatiing could also be done with the moment.js library

	// you could have an utils folder with this logic, I can see this date being passed already formatted to this component as a props.
	/*
	something like:
	--utils
	---dateUtils.js
	-----getFormattedDate()
	*/
	const month = purchaseDateTime.toLocaleString('default', { month: 'short' })
	const day = purchaseDateTime.getDay()
	const time = purchaseDateTime.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })
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