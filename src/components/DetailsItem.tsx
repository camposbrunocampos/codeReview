import React from "react"
import { View, Text } from "react-native"

import styles from "./../styles"
import { Strings } from "./../resources/index"

type Props = {
	transaction?: any,
	onChangeCategoryClicked?: () => any
}

export const DetailsItem = (props: Props) => {

	const { transaction } = props


	return (
			<View style={styles.cardItemContainer}>
					<Text style={styles.merchantName}>DETAILS</Text>

				<View>
					<Text style={styles.descriptionText}>{Strings.PURCHASED_AT}</Text>
					<Text style={styles.descriptionText}>{transaction.}</Text>


				</View>
				<Text style={styles.descriptionText}>{Strings.MERCHANT_NAME}</Text>
					<Text style={styles.descriptionText}>{Strings.WEBSITE}</Text>


			</View>
	)
}