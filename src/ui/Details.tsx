import React, { Component } from "react"
import { View, ActivityIndicator } from "react-native"
import { NavigationEvents } from "react-navigation"

import Client, { Transaction } from "./../../lib/index"
import { Colors, Strings } from "./../resources/index"
import { ErrorScreen } from "./ErrorScreen"
import styles from "./../styles"

import { TransactionItem, DetailsItem, DetailsCategoryItem } from "./../components/index"

type Props = {
	navigation: any
}

type State = {
	client: Client,
	transaction: Object,
	transactionID: string,
	userCategoryName: string,
	userCategoryID: string,
	hasError: boolean
	isLoading: boolean
}

export class Details extends Component<Props, State> {

	static navigationOptions = {
		title: Strings.DETAILS
	}

	constructor(props: Props) {
		super(props)
		this.state = {
			client: new Client(),
			transaction: {} as Transaction,
			transactionID: this.props.navigation.getParam('transactionID'),
			userCategoryName: Strings.NO_CATEGORY,
			userCategoryID: "",
			hasError: false,
			isLoading: true
		}
	}

	componentDidMount() {
		this._getTransactionDetails()
	}

	_getTransactionDetails = async () => {
		const { client, transactionID } = this.state

		if (client != null && transactionID !== null) {
			this.setState({ isLoading: true })
			await client.fetchTransaction(transactionID)
				.then((response) => {
					if (response !== null && response !== undefined) {
						this.setState({
							transaction: response,
							hasError: false
						})
						this._getTransactionCategory()
					}
				}).catch((err: any) => {
					this.setState({ hasError: true })
				})
		}
		this.setState({ isLoading: false })
	}


	_getTransactionCategory = async () => {
		const { client, transaction } = this.state
		const userCategory = transaction.integration.category

		if (client !== null && userCategory !== null && userCategory !== undefined) {
			this.setState({
				isLoading: true,
				userCategoryID: userCategory.id
			})
			await client.fetchUserCategory(userCategory.id)
				.then((response) => {
					if (response !== null && response !== undefined) {
						this.setState({
							userCategoryName: response.name,
							userCategoryID: response.id
						}, () => {
							this.setState({ isLoading: false })
						})
					}
				}).catch((err: any) => {
					console.log("Couldn't find a category")
				})
		}
	}

	_onAccountingCellCLick = () => {
		const { transaction, userCategoryID } = this.state
		const transactionID = transaction.id

		this.props.navigation.navigate('Categories', { transactionID, userCategoryID })
	}

	_onPressAlertOk = () => {
		this._getTransactionDetails()
	}

	render() {
		const { transaction, userCategoryName, hasError, isLoading } = this.state

		return (
			<View style={styles.container}>
				{isLoading && <ActivityIndicator style={styles.loadingContainer} size="large" color={Colors.HIGHLIGHT_COLOR} />}
				{!hasError && !isLoading &&
					<View>
						<NavigationEvents
							onWillFocus={payload => {
								this._getTransactionDetails()
							}}
						/>
						<TransactionItem
							transaction={transaction}
						/>
						<DetailsItem
							transaction={transaction}
						/>
						<DetailsCategoryItem
							category={userCategoryName}
							onItemClicked={() => this._onAccountingCellCLick()} />
					</View>
				}
				{hasError && !isLoading &&
					<ErrorScreen
						errorMessage={Strings.ERROR_MESSAGE_TRANSACTION_DETAILS}
						errorButton={Strings.TRY_AGAIN}
						onActionButtonClicked={() => this._onPressAlertOk()}
					/>
				}
			</View>
		)
	}
}