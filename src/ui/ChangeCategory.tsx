import React, { Component } from "react"
import { View, FlatList } from "react-native"
import Client from "./../../lib/index"

import { ErrorScreen } from "./ErrorScreen"
import styles from "./../styles"
import { CategoryItem } from "./../components/index"

type Props = {
}

type State = {
	client: any,
	categoriesList: Object[],
	hasError: boolean
}

export class ChangeCategory extends Component<Props, State> {

	static navigationOptions = {
		title: 'Change Category'
	}

	constructor(props: Props) {
		super(props)
		this.state = {
			client: null,
			categoriesList: [],
			hasError: false
		}
	}

	componentDidMount() {
		this._getCategoriesList()
	}

	_getCategoriesList = () => {
		const client = new Client()
		this.setState({ client })

		client.fetchUserCategories()
		.then((response) => {
			this.setState({ categoriesList: response})
		}).catch((err: any) => {
			this.setState({ hasError: true })
		})
	}

	_onCategoryChosen = (categoryID: string) => {
		const { client } = this.state
		const transaction = this.props.navigation.getParam('transaction')
		const transactionID = transaction.id

		if(client !== null) {
			client.updateTransactionUserCategory(transactionID, categoryID)
			.then(
				this._onPressGoBack()
			)
		}
	}

	_renderItem = (category: { id: string }) => {
		if (category) {
			return (
				<CategoryItem
					key={category.id}
					category={category}
					onItemClicked={() => this._onCategoryChosen(category.id)} />
			)
		}
	}

	_onPressGoBack = () => {
		this.props.navigation.navigate('Details')
	}

	render() {
		const {categoriesList, hasError} = this.state

		return (
			<View style={styles.container}>
			{!hasError &&
				<FlatList
					data={categoriesList}
					renderItem={({ item }) => this._renderItem(item)}
				/>
			}
			{hasError &&
				<ErrorScreen
					onActionButtonClicked={() => this._onPressGoBack()}
				/>
			}
			</View>
		)
	}
}