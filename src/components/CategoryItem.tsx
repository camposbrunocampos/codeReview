import React from "react"
import { View, TouchableHighlight, Text } from "react-native"

import { Colors } from "./../resources/index"
import Check from "./../icons/check.svg"
import styles from "./../styles"

type Props = {
	categoryName: string,
	onItemClicked?: () => any,
	isChecked: boolean
}

export const CategoryItem = (props: Props) => {

	const { categoryName, onItemClicked, isChecked } = props

	return (
		<TouchableHighlight
			onPress={onItemClicked}
			underlayColor={Colors.BACKGROUND_COLOR}>
			<View style={[styles.cardItemContainer, styles.categoriesListItem, styles.row]}>
				<Text style={styles.categoryItem}>{categoryName}</Text>
				{isChecked && <Check style={styles.categoryIcon} color={Colors.HIGHLIGHT_COLOR} width={20} height={20} />}
			</View>
		</TouchableHighlight>
	)
}