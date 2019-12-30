import React, { Component } from "react"
import { View, FlatList, ActivityIndicator } from "react-native"

import Client, { Transaction } from "./../../lib/index"
import { TransactionItem } from "./../components/index"
import { Colors, Strings } from "./../resources/index"
import { ErrorScreen } from "./ErrorScreen"
import styles from "./../styles"

type Props = {
	navigation: any
}

type State = {
	client: Client,
	transactions: Array<Object>,
	clickedTransactionID: string,
	hasError: boolean,
	isLoading: boolean
}

export class Transactions extends Component<Props, State> {
	static navigationOptions = {
		title: Strings.TRANSACTIONS
	}

	constructor(props: Props) {
		super(props)
		this.state = {
			client: new Client(),
			transactions: [] as Array<Transaction>,
			clickedTransactionID: "",
			hasError: false,
			isLoading: false
		}
	}

	componentDidMount() {
		this._getTransactionList()
	}

	_getTransactionList = async () => {
		const { client } = this.state
		this.setState({ isLoading: true })

		await client.fetchTransactions()
			.then((response: Object[]) => {
				this.setState({
					transactions: response,
					hasError: false
				})
			}).catch((err: any) => {
				this.setState({ hasError: true })
			})
		this.setState({ isLoading: false })
	}

	_renderItem = (transaction: Transaction) => {
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
		this._getTransactionList()
	}

	_onTransactionItemClicked = (transactionID: string) => {
		this.props.navigation.navigate('Details', { transactionID })
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
						errorMessage={Strings.ERROR_MESSAGE_TRANSACTIONS}
						errorButton={Strings.TRY_AGAIN}
						onActionButtonClicked={() => this._onPressTryAgain()}
					/>
				}
			</View>
		)
	}
}