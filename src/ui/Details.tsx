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

		if (client != null && transactionID !== null) { // i don't think you need this check, as you initialize client and transaction already in constructor
		//it seems they will never be null, you can likely delete this condition.
			this.setState({ isLoading: true })
			await client.fetchTransaction(transactionID)
				.then((response) => {
					if (response !== null && response !== undefined) {
						this.setState({ transaction: response })
						this._showErrorScreen(false)
						this._getTransactionCategory()
					} else {
						this._showLoading(false)
					}
				}).catch((err: any) => {
					this._showErrorScreen(true)
					this._showLoading(false)
				})
		}
	}

	_getTransactionCategory = async () => {
		const { client, transaction } = this.state
		const userCategory = transaction.integration.category

		if (client !== null && userCategory !== null && userCategory !== undefined) {
			this.setState({ userCategoryID: userCategory.id })
			await client.fetchUserCategory(userCategory.id)
				.then((response) => {
					if (response !== null && response !== undefined) {
						this.setState({
							userCategoryName: response.name,
							userCategoryID: response.id
						})
						this._showLoading(false)
					}
				}).catch((err: any) => {
					this._showLoading(false)
				})
		} else {
			this._showLoading(false)
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

	_showErrorScreen = (shouldShow: boolean) => {
		this.setState({ hasError: shouldShow })
	}

	_showLoading = (shouldShowLoadingSpinner: boolean) => {
		this.setState({ isLoading: shouldShowLoadingSpinner })
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