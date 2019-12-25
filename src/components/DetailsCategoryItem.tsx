import React from "react"
import { View, Text, Image } from "react-native"

import styles from "./../styles"
import { Strings } from "./../resources/index"

type Props = {
	category: string
}

export const DetailsCategoryItem = (props: Props) => {

	const { category } = props

	return (
		<View style={styles.cardItemContainer}>
			<Text style={styles.detailsTitle}>{Strings.ACCOUNTING}</Text>
			<View style={styles.itemDetailsLine}>
				<Text style={styles.descriptionText}>{Strings.CATEGORY}</Text>
				<Text style={[styles.descriptionText, styles.detailsHighlight]}>
				{category}
				</Text>
			</View>
		</View>
	)
}