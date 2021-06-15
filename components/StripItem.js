import React from "react"
import { View, Image, StyleSheet, Text, Pressable } from "react-native"
import { Defaults } from "../Globals/defaults"
import { server } from "../settings"
import { useNavigation } from "@react-navigation/core"

const StripItem = (props) => {
	const { image, title, newprice, oldprice, category, itemid } = props
	const navigation = useNavigation()
	return (
		<Pressable
			style={styles.row}
			onPress={() => {
				navigation.navigate("ItemDetails", { itemId: itemid })
			}}>
			<Image style={styles.img} source={{ uri: `${server}/imgs/${image}` }} />
			<View style={styles.info}>
				<Text style={styles.category}>in Furniture and Home appliances</Text>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.new}>LBP {newprice}</Text>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	img: {
		width: 70,
		height: 70
	},
	row: {
		flexDirection: "row",
		marginBottom: 5,
		paddingBottom: 5,
		borderBottomWidth: 1,
		borderColor: "#999",
		width: 280
	},
	info: {
		justifyContent: "space-between",
		paddingTop: 2,
		marginLeft: 5
	},
	title: {
		fontSize: 13
	},
	category: {
		fontSize: 12,
		color: "#555"
	},
	old: {
		color: "#777",
		textDecorationLine: "line-through"
	},
	new: {
		color: Defaults.primary,
		fontWeight: "bold"
	}
})

export default StripItem
