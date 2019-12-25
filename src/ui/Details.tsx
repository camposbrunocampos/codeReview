import React, { Component } from "react"
import { View } from "react-native"

import { TransactionItem, DetailsItem, DetailsCategoryItem } from "./../components/index"

type Props = {
	navigation: any
}

export class Details extends Component<Props> {

	static navigationOptions = {
		title: 'Details'
	};

	_onItemClicked = () => {
		console.log("cilck")
	}

	render() {
		const transaction = this.props.navigation.getParam('response')
		const merchantCategory = transaction.merchant.merchantCategory.name

		return (
			<View>
				<TransactionItem
					transaction={transaction}
				/>
				<DetailsItem
					transaction={transaction}
				/>
				<DetailsCategoryItem
					category={merchantCategory} />
			</View>
		)
	}
}