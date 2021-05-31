import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import Counter from "react-native-counters"
import { Defaults } from "../Globals/defaults"
import { server } from "../settings"

const CartItem = (props) => {
	const { image = "", text, itemid } = props
	return (
		<View style={styles.container}>
			<Image style={styles.img} source={{ uri: `${server}/imgs/${image}` }} />
			<View style={styles.info}>
				<Text style={styles.title}>{text}</Text>
				<View style={styles.holder}>
					<Text style={styles.price}>LBP 1,200,000</Text>
					<View>
						<Counter start={0} />
					</View>
				</View>
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		marginVertical: 10
	},
	img: {
		width: "100%",
		height: 200
	},
	info: {
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		backgroundColor: Defaults.white,
		padding: 10
	},
	title: {
		fontSize: 18
	},
	price: {
		fontSize: 18,
		fontWeight: "bold",
		color: Defaults.primary
	},
	holder: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 20
	}
})

export default CartItem
