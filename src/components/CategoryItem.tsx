import React from "react"
import { View, TouchableHighlight, Text } from "react-native"

import styles from "./../styles"
import { Colors } from "./../resources/index"

type Props = {
	category: any,
	onItemClicked?: () => any
}

export const CategoryItem = (props: Props) => {

	const { category, onItemClicked } = props

	return (
		<TouchableHighlight
			onPress={onItemClicked}
			underlayColor={Colors.BACKGROUND_COLOR}>
			<View style={[styles.cardItemContainer, styles.row]}>
				<Text style={styles.categoryItem}>{category.name}</Text>
			</View>
		</TouchableHighlight>
	)
}