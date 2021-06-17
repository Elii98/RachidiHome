import React from "react"
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Defaults } from "../Globals/defaults"

const WhiteTextStrip = (props) => {
	const { text, date, onPress } = props
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.item}>
				<Text style={styles.text}>{text}</Text>
				<Text style={styles.date}>{date}</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	item: {
		padding: 10,
		backgroundColor: Defaults.white,
		marginBottom: 10
	},
	text: {
		fontSize: 20,
		textTransform: "capitalize"
	},
	date: {
		fontSize: 12,
		color: "#aaa"
	}
})

export default WhiteTextStrip
