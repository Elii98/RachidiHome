import React from "react"
import { Pressable } from "react-native"
import { StyleSheet, View, Text } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Defaults } from "../Globals/defaults"

const Sort = () => {
	return (
		<View style={styles.container}>
			<Text style={[Defaults.title, { textAlign: "center", marginBottom: 10 }]}>Sort</Text>
			<Pressable style={styles.item} onPress={() => {}}>
				<Text style={styles.text}>By Relevance</Text>
				<Ionicons name="chevron-forward-outline" size={25} color="#000" />
			</Pressable>
			<Pressable style={styles.item}>
				<Text style={styles.text}>By Name</Text>
				<Ionicons name="chevron-forward-outline" size={25} color="#000" />
			</Pressable>
			<Pressable style={styles.item}>
				<Text style={styles.text}>Price: High to low</Text>
				<Ionicons name="chevron-forward-outline" size={25} color="#000" />
			</Pressable>
			<Pressable style={styles.item}>
				<Text style={styles.text}>Price: Low to high</Text>
				<Ionicons name="chevron-forward-outline" size={25} color="#000" />
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		padding: 10,
		borderBottomWidth: 1,
		borderColor: "#d0d0d0",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 5
	},
	text: {
		fontSize: 20
	},
	container: {
		padding: 20
	}
})

export default Sort
