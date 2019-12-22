import React, { Component } from "react"
import { View, Text, Button } from "react-native";

import styles from "./../styles";
import Colors from "./../resources/Colors";

export class ChangeCategory extends Component {

	static navigationOptions = {
		title: 'Change Category',
		headerTitleStyle: { color: Colors.PRIMARY_TEXT },
		headerTintColor: Colors.HIGHLIGHT_COLOR
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