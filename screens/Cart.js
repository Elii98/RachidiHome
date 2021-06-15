import React, { useEffect, useState } from "react"
import { Defaults } from "../Globals/defaults"
import Mybutton from "../components/MyButton"
import Header from "../components/Header"
import CartItem from "../components/CartItem"
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native"
import axios from "axios"
import { server } from "../settings"
import redStore from "../redux/store"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"

const Cart = (props) => {
	const { route, navigation } = props
	const [state, setState] = useState({
		cartItems: [],
		cartArrIds: redStore.getState().cartItems
	})

	useEffect(() => {
		const unsub = redStore.subscribe(() => {
			if (state.cartArrIds !== redStore.getState().cartItems) {
				setState({
					cartArrIds: redStore.getState().cartItems
				})
			}
		})

		return () => unsub()
	}, [])

	useEffect(() => {
		const getCartItems = async () => {
			const ids = redStore.getState().cartItems
			const r = await axios.post(`${server}/getCartItems.php`, { ids })
			setState((state) => ({
				...state,
				cartItems: r.data.items
			}))
		}
		getCartItems()
	}, [state.cartArrIds])
	console.log(`state.cartItems`, state.cartItems)
	return (
		<SafeAreaView>
			<Header />
			<ScrollView contentContainerStyle={styles.scroller}>
				<StatusBar style="auto" />
				<View style={styles.container}>
					<View style={styles.strip}>
						<Text style={Defaults.title}>Cart</Text>
						<Text style={styles.clear}>Clear items</Text>
					</View>
					<View>
						{state.cartArrIds !== undefined ? (
							<>
								{state.cartItems.map((item, key) => {
									const counterKey = item.id
									const cartCounter = state.cartArrIds[counterKey]
									return (
										<CartItem
											key={key}
											text={item.title}
											image={item.image}
											itemid={item.id}
											counter={cartCounter}
											newprice={item.newprice}
											oldprice={item.oldprice}
										/>
									)
								})}
							</>
						) : (
							<Text>There are no items in the cart yet</Text>
						)}
					</View>
				</View>
				{/* <View style={styles.payment}>
					<View style={styles.couponHolder}>
						<TextInput style={styles.input} placeholder="Enter your coupon code" />
						<SmallButton style={styles.btn} />
					</View>
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
				</View> */}
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
