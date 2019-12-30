import React, { Component } from "react"
import { View, FlatList, ActivityIndicator, Alert } from "react-native"

import Client from "./../../lib/index"
import { TransactionItem } from "./../components/index"
import { Colors, Strings } from "./../resources/index"
import { ErrorScreen } from "./ErrorScreen"
import styles from "./../styles"

type Props = {
	navigation: any
}

type State = {
	client: any,
	transactions: Array<Object>,
	clickedTransactionID: string | number | undefined,
	transactionDetails: any,
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
			transactionDetails: null,
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
		const { transactions } = this.state

		if (transactions == null) {
			this._getTransactionList()
		} else {
			this.setState({ hasError: false })
		}
	}

	_onTransactionItemClicked = (transactionID: string | number | undefined) => {
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