import React, { Component } from "react"
import { View } from "react-native";

import { TransactionItem, DetailsItem } from "./../components/index";

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
		const hasTransaction = transaction !== null && transaction !== undefined
		console.log(transaction)

		return (
			<View>
				{hasTransaction &&
					<View>
						<TransactionItem transaction={transaction} />
						<DetailsItem />
					</View>
				}

			</View>
		)
	}
}