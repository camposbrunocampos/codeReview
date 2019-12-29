import React, { Component } from "react"
import { View } from "react-native"
import { NavigationEvents } from "react-navigation"
import Client, { Transaction, UserCategory } from "./../../lib/index"

import { TransactionItem, DetailsItem, DetailsCategoryItem } from "./../components/index"

type Props = {
	navigation: any
}

type State = {
	client: any,
	transaction: Transaction,
	transactionCategory: UserCategory,
	transactionCategoryName: string,
	transactionCategoryID: string
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
			transactionCategory: this.props.navigation.getParam('transactionCategory'),
			transactionCategoryName: "No Category",
			transactionCategoryID: ""
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
		const { client, transactionCategoryID } = this.state

		if (client !== null) {
			client.fetchUserCategory(transactionCategoryID)
				.then((response: { name: string; id: string; } | null | undefined) => {
					console.log(response)
					if (response !== null && response !== undefined) {
						this.setState({ 
							transactionCategoryName: response.name,
							transactionCategoryID: response.id
						 })
					}
				}).catch((err: any) => {
					console.log(err)
				})
		}
	}

	_onAccountingCellCLick = () => {
		const { transaction, transactionCategoryID } = this.state
		const transactionID = transaction.id
		
		this.props.navigation.navigate('Categories', { transactionID, transactionCategoryID })
	}

	render() {
		const { transaction, transactionCategoryName } = this.state

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
					category={transactionCategoryName}
					onItemClicked={() => this._onAccountingCellCLick()} />
			</View>
		)
	}
}