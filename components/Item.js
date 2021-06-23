import { useNavigation } from "@react-navigation/core"
import React from "react"
import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import { TouchableRipple } from "react-native-paper"
import { Defaults } from "../Globals/defaults"
import { server } from "../settings"
import Ionicons from "react-native-vector-icons/Ionicons"
import redStore from "../redux/store"
import { bookmark } from "../redux/actions"

const Item = (props) => {
	const { size, icon, image, title, newPrice, itemid } = props
	const wishlist = icon ? (
		<Ionicons
			onPress={() => removeBookmark()}
			name="close-outline"
			size={30}
			color="#fff"
			style={styles.delete}
		/>
	) : null
	const price = Number(newPrice).toLocaleString()
	const removeBookmark = () => {
		redStore.dispatch(bookmark({ itemid, flag: false }))
	}
	const navigation = useNavigation()
	return (
		<TouchableRipple
			borderless={true}
			style={{ marginRight: 10 }}
			onPress={() => {
				navigation.navigate("ItemDetails", { itemId: itemid })
			}}
			rippleColor="rgba(0,0,0,0.1)">
			<View
				style={{
					...styles.holder,
					width: size !== "full" ? 250 : "100%"
				}}>
				<Image
					style={styles.img}
					source={{ uri: `${server}/medias/${image}` }}
				/>
				<Text
					style={[
						styles.tag,
						{ display: size !== "full" ? "flex" : "none" }
					]}>
					Sale
				</Text>
				{wishlist}
				<View style={styles.details}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.price}>LBP {price}</Text>
				</View>
			</View>
		</TouchableRipple>
	)
}

const styles = StyleSheet.create({
	holder: {
		backgroundColor: Defaults.white
	},
	tag: {
		position: "absolute",
		fontSize: 12,
		bottom: 100,
		right: 20,
		backgroundColor: Defaults.black,
		color: Defaults.white,
		padding: 10,
		borderRadius: 5,
		overflow: "hidden",
		width: 70,
		textAlign: "center"
	},
	img: {
		width: "100%",
		height: 200,
		resizeMode: "cover"
	},
	title: {
		marginBottom: 10
	},
	price: {
		fontSize: 20,
		color: Defaults.primary,
		fontWeight: "bold"
	},
	details: {
		padding: 15
	},
	delete: {
		position: "absolute",
		top: 20,
		left: 10,
		padding: 5,
		backgroundColor: "red",
		borderRadius: 5,
		overflow: "hidden"
	}
})

export default Item
