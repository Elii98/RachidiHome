import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { Defaults } from "../Globals/defaults"

const SmallButton = () => {
	return (
		<TouchableOpacity>
			<Text style={styles.btn}>Apply</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	btn: {
		color: Defaults.white,
		backgroundColor: Defaults.primary,
		textTransform: "uppercase",
		padding: 10,
		textAlign: "center",
		overflow: "hidden",
		marginLeft: 5,
		flexShrink: 0
	}
})
export default SmallButton
