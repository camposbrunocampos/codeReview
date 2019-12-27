import React, { Component } from "react"
import { View } from "react-native"
import { NavigationEvents } from "react-navigation"
import Client from "./../../lib/index"

import { TransactionItem, DetailsItem, DetailsCategoryItem } from "./../components/index"

type Props = {
	navigation: any
}

type State = {
	client: any,
	transaction: Object[],
	transactionCategory: string
}

export class Details extends Component<Props, State> {

	static navigationOptions = {
		title: 'Details'
	}

	constructor(props: Props) {
		super(props)
		this.state = {
			client: null,
			transaction: this.props.navigation.getParam('transactionDetails'),
			transactionCategory: ""
		}
	}

	componentDidMount() {
		this._setClient()
	}

	_setClient = () => {
		const client = new Client()
		this.setState({ client },
			() => this._getTransactionCategory()
		)
	}

	_getTransactionCategory = () => {
		const { client, transaction } = this.state
		const transactionCategoryID = transaction.integration.id

		if (client !== null) {
			client.fetchUserCategory(transactionCategoryID)
				.then((response) => {
					console.log(response)
					if (response !== null && response !== undefined) {
						this.setState({ transactionCategory: response })
					}
				}).catch((err: any) => {
					console.log(err)
				})
		}
	}

	_onAccountingCellCLick = () => {
		const { transaction } = this.state
		this.props.navigation.navigate('ChangeCategory', { transaction })
	}

	render() {
		const { transaction, transactionCategory } = this.state

		return (
			<View>
				<NavigationEvents
					onWillFocus={payload => {
						this._getTransactionCategory()
					}}
				/>
				<TransactionItem
					transaction={transaction}
				/>
				<DetailsItem
					transaction={transaction}
				/>
				<DetailsCategoryItem
					category={transactionCategory}
					onItemClicked={() => this._onAccountingCellCLick()} />
			</View>
		)
	}
}