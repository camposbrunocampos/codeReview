import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Transactions, Details, ChangeCategory } from './ui/index';

const AppNavigator = createStackNavigator({
	Transactions: { screen: Transactions },
	Details: { screen: Details },
	ChangeCategory: { screen: ChangeCategory }
});

const App = createAppContainer(AppNavigator);

export default App;