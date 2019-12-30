import { createStackNavigator, createAppContainer } from "react-navigation"
import { Transactions, Details, Categories } from "./ui/index"

import { Colors, Dimens } from "./resources/index"

const AppNavigator = createStackNavigator({
	Transactions: { screen: Transactions },
	Details: { screen: Details },
	Categories: { screen: Categories }
}, {
		defaultNavigationOptions: {
			headerTitleStyle: { color: Colors.PRIMARY_TEXT },
			headerStyle: {
				borderBottomWidth: 0
			},
			headerTintColor: Colors.HIGHLIGHT_COLOR
		}
	});

const App = createAppContainer(AppNavigator);

export default App;