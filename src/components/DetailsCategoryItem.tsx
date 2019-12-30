import React from "react"
import { View, Text, TouchableHighlight } from "react-native"

import { Colors, Strings } from "./../resources/index"
import ArrowRight from "./../icons/arrow-right.svg"
import styles from "./../styles"

type Props = {
	category: string,
	onItemClicked?: () => any
}

export const DetailsCategoryItem = (props: Props) => {

	const { category, onItemClicked } = props

	return (
		<TouchableHighlight
			onPress={onItemClicked}
			underlayColor={Colors.BACKGROUND_COLOR}>
			<View style={styles.cardItemContainer}>
				<Text style={styles.detailsTitle}>{Strings.ACCOUNTING}</Text>
				<View style={styles.itemDetailsLine}>
					<Text style={styles.descriptionText}>{Strings.CATEGORY}</Text>
					<View style={styles.row}>
						<Text style={[styles.descriptionText, styles.detailsHighlight]}>{category}</Text>
						<ArrowRight style={styles.categoryIcon} color={Colors.HIGHLIGHT_COLOR} width={12} height={12} />
					</View>
				</View>
			</View>
		</TouchableHighlight>
	)
}