import React from "react"
import { TouchableOpacity } from "react-native"
import { View, Text, StyleSheet } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

const Counter = (props) => {
	const { start = 0, onChange } = props

	const changeCount = (add) => {
		let count = start + add
		count = count < 1 ? 0 : count
		onChange && onChange(count)
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => changeCount(-1)} style={styles.btn}>
				<Ionicons name="remove-outline" size={20} color="#616161" />
			</TouchableOpacity>
			<Text style={styles.number}>{start}</Text>
			<TouchableOpacity onPress={() => changeCount(1)} style={styles.btn}>
				<Ionicons name="add-outline" size={20} color="#616161" />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center"
	},
	btn: {
		padding: 6,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#a398d2"
	},
	number: {
		fontSize: 20,
		marginHorizontal: 20
	}
})

export default Counter
