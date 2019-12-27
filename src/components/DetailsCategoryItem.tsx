import React from "react"
import { View, Text, TouchableHighlight } from "react-native"
import Svg from "react-native-svg"

import styles from "./../styles"
import { Colors, Strings } from "./../resources/index"

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
				<Text style={[styles.descriptionText, styles.detailsHighlight]}>
				{category}
				</Text>
			</View>
		</View>
		</TouchableHighlight>
	)
}