import React, { Component } from "react"
import { View, Text, Button } from "react-native";

import styles from "./../styles";

export class Transactions extends Component {

	static navigationOptions = {
    title: 'Transactions',
	};
	
	render() {
		return (
			<View style={styles.container}>
				<Text>Transactions Screen</Text>
				<Button
          title="Go To Details"
          onPress={() =>
            this.props.navigation.navigate('Details')
          }
        />
			</View>
		)
	}
}