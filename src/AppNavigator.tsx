import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Transactions, Details, ChangeCategory } from './ui/index';

import { Colors, Dimens } from "./resources/index"

const AppNavigator = createStackNavigator({
	Transactions: { screen: Transactions },
	Details: { screen: Details },
	ChangeCategory: { screen: ChangeCategory }
}, {
		defaultNavigationOptions: {
			headerTitleStyle: { color: Colors.PRIMARY_TEXT },
			headerStyle: { 
				marginBottom: Dimens.MARGIN_MEDIUM,
				borderBottomWidth: 0
			},
			headerTintColor: Colors.HIGHLIGHT_COLOR
		}
	});

const App = createAppContainer(AppNavigator);

export default App;