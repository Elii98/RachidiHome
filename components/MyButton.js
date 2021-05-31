import React from "react"
import { StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native"
import { Defaults } from "../Globals/defaults"

const MyButton = (props) => {
	const { text, color, onpress, Disabled = false } = props
	return (
		<TouchableOpacity disabled={Disabled} onPress={onpress}>
			<Text style={[styles.btn, { backgroundColor: color }]}>{text}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	btn: {
		color: Defaults.white,
		textTransform: "uppercase",
		padding: 15,
		textAlign: "center",
		borderRadius: 5,
		overflow: "hidden",
		marginVertical: 5
	}
})
export default MyButton
