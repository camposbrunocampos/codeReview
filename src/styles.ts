import { StyleSheet } from "react-native";
import { Colors, Dimens } from "./resources/index";

export default StyleSheet.create({
	cardItemContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: Colors.BACKGROUND_COLOR,
		paddingTop: Dimens.PADDING_XLARGE,
		paddingRight: Dimens.PADDING_LARGE,
		paddingBottom: Dimens.PADDING_XLARGE,
		paddingLeft: Dimens.PADDING_LARGE,
		marginBottom: Dimens.MARGIN_XSMALL
	},
	merchantInfoContainer: {
		justifyContent: "center",
	},
	merchantAmountContainer: {
		justifyContent: "center",
	},
	merchantName: {
		color: Colors.PRIMARY_TEXT,
		fontWeight: "bold",
		marginBottom: Dimens.MARGIN_MEDIUM
	},
	transactionAmount: {
		fontSize: Dimens.FONT_LARGE,
		fontWeight: "bold"
	},
	descriptionText: {
		fontSize: Dimens.FONT_SMALL,
		fontWeight: "bold",
		color: Colors.SECONDARY_TEXT
	}
});
