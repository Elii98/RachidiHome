import React, { useState } from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import Counter from "./Counter"
import { Defaults } from "../Globals/defaults"
import { server } from "../settings"
import redStore from "../redux/store"
import { changeCartCount, removeCartItem } from "../redux/actions"

const CartItem = (props) => {
	const { image = "", text, itemid, counter, oldprice, newprice } = props

	const [state, setState] = useState({
		counter: counter
	})

	const changeCounter = (counter) => {
		if (counter > 0) {
			redStore.dispatch(changeCartCount(itemid, counter))
			setState({ ...state, counter })
		} else {
			redStore.dispatch(removeCartItem(itemid))
		}
	}

	return (
		<View style={styles.container}>
			<Image
				style={styles.img}
				source={{ uri: `${server}/media/${image}` }}
			/>
			<View style={styles.info}>
				<Text style={styles.title}>{text}</Text>
				<View style={styles.holder}>
					<Text style={styles.price}>
						LBP {Number(newprice).toLocaleString()}
					</Text>
				</View>
				<View style={styles.counterContainer}>
					<Counter start={state.counter} onChange={changeCounter} />
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
	},
	counterContainer: {
		marginLeft: 100,
		marginTop: 20
	}
})

export default CartItem
