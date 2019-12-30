import { StyleSheet } from "react-native"
import { Colors, Dimens } from "./resources/index"

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.BACKGROUND_COLOR,
		paddingTop: Dimens.PADDING_MEDIUM
	},
	cardItemContainer: {
		justifyContent: "space-between",
		backgroundColor: Colors.WHITE,
		paddingTop: Dimens.PADDING_XLARGE,
		paddingRight: Dimens.PADDING_LARGE,
		paddingBottom: Dimens.PADDING_XLARGE,
		paddingLeft: Dimens.PADDING_LARGE,
		marginBottom: Dimens.MARGIN_XSMALL
	},
	categoriesListItem: {
		height: 50,
		marginBottom: 1
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
	categoryIcon: {
		margin: 0,
		alignSelf: "flex-end"
	},
	itemDetailsLine: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	categoryItem: {
		color: Colors.PRIMARY_TEXT,
		fontSize: Dimens.FONT_MEDIUM
	},
	errorScreenContainer: {
		flex: 1,
		backgroundColor: Colors.BACKGROUND_COLOR,
		alignItems: "center",
		justifyContent: "center"
	},
	errorTitle: {
		fontSize: Dimens.FONT_LARGE,
		fontWeight: "bold"
	},
	loadingContainer: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center"
	},
	row: {
		flexDirection: "row"
	}
});
