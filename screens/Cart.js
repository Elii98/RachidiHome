import React, { useEffect, useState } from "react"
import Counter from "react-native-counters"
import { Defaults } from "../Globals/defaults"
import Mybutton from "../components/MyButton"
import Header from "../components/Header"
import CartItem from "../components/CartItem"
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native"
import axios from "axios"
import { server } from "../settings"
import redStore from "../redux/store"

const Cart = (props) => {
	const { route, navigation } = props
	const [state, setState] = useState({
		cartItems: [],
		msg: false
	})

	useEffect(() => {
		if (redStore.getState().cartItems) {
			const getCartItems = async () => {
				const ids = redStore.getState().cartItems
				const r = await axios.get(`${server}/getCartItems.php`, { params: { ids: ids } })
				console.log(`ids`, ids)
				setState((state) => ({
					...state,
					cartItems: r.data
				}))
			}
			getCartItems()
		}
	}, [])
	return (
		<View>
			<Header />
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.strip}>
						<Text style={Defaults.title}>Cart</Text>
						<Text style={styles.clear}>Clear items</Text>
					</View>
					<View>
						{state.msg ? (
							<CartItem text="Test" image="img2.png" itemid="1" />
						) : (
							<Text>There are no items in the cart yet</Text>
						)}
					</View>
				</View>
				<View style={styles.payment}>
					{/* <View style={styles.couponHolder}>
						<TextInput style={styles.input} placeholder="Enter your coupon code" />
						<SmallButton style={styles.btn} />
					</View> */}
					<View style={styles.fees}>
						<View style={styles.row}>
							<Text style={styles.title}>Subtotal</Text>
							<Text style={styles.price}>LBP 24,000,000</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.title}>Additional fees</Text>
							<Text style={styles.price}>TBD</Text>
						</View>
						<View style={styles.line}></View>
						<View style={styles.row}>
							<Text style={styles.total}>Grand Total</Text>
							<Text style={styles.total}>LBP 13,499,820</Text>
						</View>
					</View>
					<Mybutton
						onPress={() => navigation.navigate("Home")}
						text="Proceed to checkout"
						color={Defaults.secondary}
					/>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 30
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
