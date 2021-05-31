import React from "react"
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Defaults } from "../Globals/defaults"

const WhiteTextStrip = (props) => {
	const { text, onpress } = props
	return (
		<TouchableWithoutFeedback onPress={onpress}>
			<View style={styles.item}>
				<Text style={styles.text}>{text}</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	item: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 10,
		backgroundColor: Defaults.white,
		marginBottom: 10
	},
	text: {
		fontSize: 20,
		textTransform: "capitalize"
	}
})

export default WhiteTextStrip
