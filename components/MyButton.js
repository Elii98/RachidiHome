import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { TouchableRipple } from "react-native-paper"
import { Defaults } from "../Globals/defaults"

const MyButton = (props) => {
	const { text, color, ...attr } = props
	return (
		<View style={[styles.btn, { backgroundColor: color }]}>
			<TouchableRipple style={styles.ripple} rippleColor="rgba(255, 255, 255, .32)" {...attr}>
				<Text style={styles.text}>{text}</Text>
			</TouchableRipple>
		</View>
	)
}

const styles = StyleSheet.create({
	btn: {
		borderRadius: 5,
		overflow: "hidden",
		marginVertical: 5
	},
	ripple: {
		padding: 15
	},
	text: {
		textAlign: "center",
		color: Defaults.white,
		textTransform: "uppercase"
	}
})
export default MyButton
