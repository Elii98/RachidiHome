import React, { useEffect, useState } from "react"
import { Defaults } from "../Globals/defaults"
import Mybutton from "../components/MyButton"
import Header from "../components/Header"
import CartItem from "../components/CartItem"
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native"
import redStore from "../redux/store"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"
import { clearCart } from "../redux/actions"

const Cart = (props) => {
	const [state, setState] = useState({
		cartItems: redStore.getState().cartItems
	})

	useEffect(() => {
		const unsub = redStore.subscribe(() => {
			if (state.cartItems !== redStore.getState().cartItems) {
				setState({
					cartItems: redStore.getState().cartItems
				})
			}
		})

		return () => unsub()
	}, [])

	const clearItems = () => {
		redStore.dispatch(clearCart())
	}

	return (
		<SafeAreaView>
			<Header />
			<ScrollView contentContainerStyle={styles.scroller}>
				<StatusBar style="auto" />
				<View style={styles.container}>
					<View style={styles.strip}>
						<Text style={Defaults.title}>Cart</Text>
						<Text style={styles.clear} onClick={clearItems}>
							Clear items
						</Text>
					</View>
					<View>
						{!state.cartItems.length && (
							<Text style={Defaults.textEmpty}>
								There are no items in the cart yet
							</Text>
						)}
						{Object.values(state.cartItems).map((item, key) => (
							<CartItem
								key={key}
								text={item.text}
								image={item.image}
								itemid={item.itemid}
								counter={item.counter}
								newprice={item.newprice}
								oldprice={item.oldprice}
							/>
						))}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 30
	},
	scroller: {
		paddingBottom: 120
	},
	strip: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: 10
	},
	clear: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderWidth: 1
	},
	payment: {
		paddingHorizontal: 30,
		paddingVertical: 30,
		marginVertical: 90,
		backgroundColor: Defaults.white
	},
	couponHolder: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	input: {
		flexGrow: 1,
		backgroundColor: Defaults.bg,
		padding: 10
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginVertical: 10
	},
	title: {},
	price: {},
	line: {
		borderBottomWidth: 1
	},
	total: {
		fontWeight: "bold",
		textTransform: "uppercase"
	}
})

export default Cart
