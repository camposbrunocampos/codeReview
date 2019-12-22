import React, { Component } from "react"
import { View, Text, Button } from "react-native";

import styles from "./../styles";
import Colors from "./../resources/Colors";

export class Details extends Component {

	static navigationOptions = {
		title: 'Details',
		headerTitleStyle: { color: Colors.PRIMARY_TEXT },
		headerTintColor: Colors.HIGHLIGHT_COLOR
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>Details Screen</Text>
				<Button
          title="Go To Change Category"
          onPress={() =>
            this.props.navigation.navigate('ChangeCategory')
          }
        />
			</View>
		)
	}
}