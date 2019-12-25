import React, { Component } from "react"
import { View, FlatList } from "react-native"

import { TransactionItem } from "./../components/index"
import Client from "./../../lib/index"
import { Strings } from "./../resources/index"
import { ErrorScreen } from "./ErrorScreen"

type Props = {
}

type State = {
	client: any,
	transactions: Array<Object>,
	clickedTransactionID: string | number | undefined,
	isTransactionError: boolean,
	isTransactionDetailError: boolean
}

export class Transactions extends Component<Props, State> {
	static navigationOptions = {
		title: 'Transactions'
	}

	constructor(props: Props) {
		super(props)
		this.state = {
			client: null,
			transactions: [],
			clickedTransactionID: "",
			isTransactionError: false,
			isTransactionDetailError: false
		};
	}

	componentDidMount() {
		this._getTransactionList()
	}

	_getTransactionList = () => {
		const client = new Client()
		this.setState({
			client,
			isTransactionError: false
		})

		client.fetchTransactions()
			.then((response: Object[]) => {
				this.setState({ transactions: response })
			}).catch((err: any) => {
				this.setState({ isTransactionError: true })
			})
	}

	_getTransactionDetails = () => {
		const { client, clickedTransactionID } = this.state
		this.setState({
			isTransactionDetailError: false
		})

		if (client != null && clickedTransactionID !== null) {
			client.fetchTransaction(clickedTransactionID)
				.then((response: Object[]) => {
					if (response !== null && response !== undefined){
						this.props.navigation.navigate('Details', { response })
					} else {
						this.setState({ isTransactionDetailError: true })
					}
				}).catch((err: any) => {
					this.setState({ isTransactionDetailError: true })
				})
		}
	}

	_renderItem = (transaction: { id: string | number | undefined; merchant: { name: string; merchantCategory: { name: string; }; }; amount: number; }) => {
		if (transaction) {
			return (
				<TransactionItem
					key={transaction.id}
					transaction={transaction}
					onItemClicked={() => this._onTransactionItemClicked(transaction.id)} />
			)
		}
	}

	_onPressTryAgain = () => {
		const { isTransactionDetailError } = this.state

		if (isTransactionDetailError) {
			this._getTransactionDetails()
		} else {
			this._getTransactionList()
		}
	}

	_onTransactionItemClicked = (transactionID: string | number | undefined) => {
		this.setState({ clickedTransactionID: transactionID })
		this._getTransactionDetails()
	}

	render() {
		const { transactions, isTransactionError, isTransactionDetailError } = this.state
		const hasError = isTransactionError || isTransactionDetailError

		const errorName = isTransactionError ? Strings.ERROR_LOADING_TRANSACTIONS_LIST : Strings.ERROR_LOADING_TRANSACTION_DETAILS

		return (
			<View style={{flex: 1}}>
				{!hasError &&
					<FlatList
						data={transactions}
						renderItem={({ item }) => this._renderItem(item)}
					/>
				}
				{hasError &&
					<ErrorScreen
						errorName={errorName}
						onActionButtonClicked={() => this._onPressTryAgain()}
					/>
				}
			</View>
		)
	}
}