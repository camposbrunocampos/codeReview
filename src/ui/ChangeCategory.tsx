import React, { Component } from "react"
import { View, Text, Button } from "react-native";

import styles from "./../styles";

export class ChangeCategory extends Component {

	static navigationOptions = {
		title: 'Change Category'
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>Change Category Screen</Text>
				<Button
          title="Go Back To Details"
          onPress={() =>
            this.props.navigation.navigate('Details')
          }
        />
			</View>
		)
	}
}