import React, { Component } from "react"
import { View, FlatList, ActivityIndicator } from "react-native"

import { TransactionItem } from "./../components/index"
import Client from "./../../lib/index"
import { ErrorScreen } from "./ErrorScreen"
import { Colors } from "./../resources/index"
import styles from "./../styles"

type Props = {
}

type State = {
	client: any,
	transactions: Array<Object>,
	clickedTransactionID: string | number | undefined,
	transactionDetails: Object[],
	hasError: boolean,
	isLoading: boolean
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
			transactionDetails: [],
			hasError: false,
			isLoading: false
		}
	}

	componentDidMount() {
		this._getTransactionList()
	}

	_getTransactionList = async () => {
		const client = new Client()
		this.setState({
			client,
			isLoading: true
		})

		await client.fetchTransactions()
			.then((response: Object[]) => {
				this.setState({ transactions: response })
			}).catch((err: any) => {
				this.setState({ hasError: true })
			})
		this.setState({ isLoading: false })
	}

	_getTransactionDetails = async () => {
		const { client, clickedTransactionID } = this.state
		this.setState({
			hasError: false,
			isLoading: true
		})

		if (client != null && clickedTransactionID !== null) {
			await client.fetchTransaction(clickedTransactionID)
				.then((response: Object[]) => {
					if (response !== null && response !== undefined) {
						this.setState({
							transactionDetails: response,
							hasError: false
						})
						this._goToDetailsScreen()
					} else {
						this.setState({ hasError: true })
					}
				}).catch((err: any) => {
					this.setState({ hasError: true })
				})
			this.setState({ isLoading: false })
		}
	}

	_goToDetailsScreen = () => {
		const { transactionDetails } = this.state
		const transactionCategory = transactionDetails.userCategory

		this.props.navigation.navigate('Details', { transactionDetails, transactionCategory })
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

	_onPressGoBack = () => {
		const { transactions } = this.state

		if (transactions == null) {
			this._getTransactionList()
		} else {
			this.setState({ hasError: false })
		}
	}

	_onTransactionItemClicked = (transactionID: string | number | undefined) => {
		this.setState({ clickedTransactionID: transactionID })
		this._getTransactionDetails()
	}

	render() {
		const { transactions, hasError, isLoading } = this.state

		return (
			<View style={styles.container}>
				{isLoading && <ActivityIndicator style={styles.loadingContainer} size="large" color={Colors.HIGHLIGHT_COLOR} />}

				{!hasError && !isLoading &&
					<FlatList
						data={transactions}
						renderItem={({ item }) => this._renderItem(item)}
					/>
				}
				{hasError && !isLoading &&
					<ErrorScreen
						onActionButtonClicked={() => this._onPressGoBack()}
					/>
				}
			</View>
		)
	}
}