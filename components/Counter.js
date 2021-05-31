import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { View, Text, StyleSheet } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { count } from "../redux/actions"
import redStore from "../redux/store"

const Counter = (props) => {
	const { start = 0 } = props
	const [number, setNumber] = useState(start)
	const decrease = async () => {
		if (number !== 0) {
			const num = number - 1
			await setNumber(num)
			redStore.dispatch(count(num))
		}
	}
	const increase = async () => {
		const num = number + 1
		await setNumber(num)
		redStore.dispatch(count(num))
	}
	useEffect(() => {
		if (start > 0) {
			redStore.dispatch(count(start))
		}
		setNumber(start)
	}, [start])
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => {
					decrease()
				}}
				style={styles.btn}>
				<Ionicons name="remove-outline" size={20} color="#616161" />
			</TouchableOpacity>
			<Text style={styles.number}>{number}</Text>
			<TouchableOpacity
				onPress={() => {
					increase()
				}}
				style={styles.btn}>
				<Ionicons name="add-outline" size={20} color="#616161" />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
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
