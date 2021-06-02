import React from "react"
import { Pressable } from "react-native"
import { StyleSheet, View, Text } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Defaults } from "../Globals/defaults"
import { searchFilter } from "../redux/actions"
import redStore from "../redux/store"

const Sort = React.forwardRef((props, ref) => {
	const onSort = (data) => {
		redStore.dispatch(searchFilter({ sort: data }))
		ref.current.close()
	}
	return (
		<View style={styles.container}>
			<Text style={[Defaults.title, { textAlign: "center", marginBottom: 10 }]}>Sort</Text>
			<Pressable
				style={styles.item}
				onPress={() => {
					onSort("relevance")
				}}>
				<Text style={styles.text}>By Relevance</Text>
				<Ionicons name="chevron-forward-outline" size={25} color="#000" />
			</Pressable>
			<Pressable
				style={styles.item}
				onPress={() => {
					onSort("alphabetical")
				}}>
				<Text style={styles.text}>By Name</Text>
				<Ionicons name="chevron-forward-outline" size={25} color="#000" />
			</Pressable>
			<Pressable
				style={styles.item}
				onPress={() => {
					onSort("priceHigh")
				}}>
				<Text style={styles.text}>Price: High to low</Text>
				<Ionicons name="chevron-forward-outline" size={25} color="#000" />
			</Pressable>
			<Pressable
				style={styles.item}
				onPress={() => {
					onSort("priceLow")
				}}>
				<Text style={styles.text}>Price: Low to high</Text>
				<Ionicons name="chevron-forward-outline" size={25} color="#000" />
			</Pressable>
		</View>
	)
})

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
