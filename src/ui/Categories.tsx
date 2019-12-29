import React, { Component } from "react"
import { View, FlatList, ActivityIndicator, Alert } from "react-native"
import Client from "../../lib/index"

import { ErrorScreen } from "./ErrorScreen"
import styles from "../styles"
import { CategoryItem } from "../components/index"
import { Colors, Strings } from "./../resources/index"

type Props = {
}

type State = {
	client: any,
	categoriesList: Object[],
	selectedCategoryID: string,
	previousSelectedCategoryID: string,
	hasError: boolean,
	isLoading: boolean
}

export class Categories extends Component<Props, State> {

	static navigationOptions = {
		title: 'Change Category'
	}

	constructor(props: Props) {
		super(props)
		this.state = {
			client: null,
			categoriesList: [],
			selectedCategoryID: this.props.navigation.getParam('transactionCategoryID'),
			previousSelectedCategoryID: "",
			hasError: false,
			isLoading: false
		}
	}

	componentDidMount() {
		this._getCategoriesList()
	}

	_getCategoriesList = async () => {
		const client = new Client()
		this.setState({
			client,
			previousSelectedCategoryID: this.state.selectedCategoryID,
			isLoading: true
		})

		await client.fetchUserCategories()
			.then((response) => {
				this.setState({ categoriesList: response })
			}).catch((err: any) => {
				this.setState({ hasError: true })
			})
		this.setState({ isLoading: false })
	}

	_onCategoryChosen = async (categoryID: string) => {
		const { client, previousSelectedCategoryID } = this.state
		const transactionID = this.props.navigation.getParam('transactionID')

		this.setState({
			selectedCategoryID: categoryID,
			isLoading: true
		})

		if (client !== null) {
			await client.updateTransactionUserCategory(transactionID, categoryID)
				.then((response: any) => {
					console.log(response)
					if (response != null && response !== undefined) {
						this._onPressGoBack()
					}
				}).catch((err: any) => {
					this._showAlert()
					this.setState({ selectedCategoryID: previousSelectedCategoryID })
				})
		}
		this.setState({ isLoading: false })
	}

	_renderItem = (category: { id: string; name: string }) => {
		const { selectedCategoryID } = this.state

		if (category) {
			return (
				<CategoryItem
					key={category.id}
					categoryName={category.name}
					onItemClicked={() => this._onCategoryChosen(category.id)}
					isChecked={selectedCategoryID === category.id} />
			)
		}
	}

	_onPressGoBack = () => {
		this.props.navigation.navigate('Details')
	}

	_showAlert = () => {
		Alert.alert(
			Strings.ALERT_TITLE,
			Strings.ALERT_MESSAGE,
			{
				text: Strings.OK,
				style: 'cancel',
			}
			,
			{ cancelable: false },
		);
	}

	render() {
		const { categoriesList, hasError, isLoading } = this.state

		return (
			<View style={styles.container}>
				{isLoading && <ActivityIndicator style={styles.loadingContainer} size="large" color={Colors.HIGHLIGHT_COLOR} />}
				{!hasError && !isLoading &&
					<FlatList
						data={categoriesList}
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