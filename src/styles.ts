import { StyleSheet } from "react-native"
import { Colors, Dimens } from "./resources/index"

export default StyleSheet.create({
	cardItemContainer: {
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
		fontSize: Dimens.FONT_LARGE
	},
	transactionAmount: {
		fontSize: Dimens.FONT_LARGE,
		fontWeight: "bold"
	},
	detailsTitle: {
		fontSize: Dimens.FONT_MEDIUM,
		fontWeight: "600",
		color: Colors.PRIMARY_TEXT,
		marginBottom: Dimens.MARGIN_SMALL
	},
	descriptionText: {
		fontSize: Dimens.FONT_SMALL,
		fontWeight: "600",
		color: Colors.SECONDARY_TEXT,
		marginTop: Dimens.MARGIN_MEDIUM
	},
	detailsDescription: {
		color: Colors.PRIMARY_TEXT
	},
	detailsHighlight: {
		color: Colors.HIGHLIGHT_COLOR
	},
	itemDetailsLine: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	errorScreenContainer: {
		flex: 1,
		backgroundColor: Colors.BACKGROUND_COLOR,
		alignItems: "center",
		justifyContent: "center"
	},
	row: {
		flexDirection: "row"
	}
});
