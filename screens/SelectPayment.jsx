import axios from "axios"
import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { RadioButton, TouchableRipple } from "react-native-paper"
import MyButton from "../components/MyButton"
import { Defaults, Styles } from "../Globals/defaults"
import redStore from "../redux/store"
import { server } from "../settings"
import Toast from "react-native-toast-message"

const SelectPayment = (props) => {
	const { navigation, close, addressId, billingId, items, subTotal } = props
	const [state, setState] = useState({
		checked: "",
		error: ""
	})

	const handleCheck = (checked) => {
		setState({ ...state, checked })
	}

	const handleSubmit = async () => {
		if (!state.checked) {
			setState({
				...state,
				error: "Please select a payment method"
			})
			return
		}
		Toast.show({
			text1: "Items orderd"
		})
		checkOut()
		close && close()
		navigation.navigate("Home")
	}

	const checkOut = async () => {
		const { user, jwt } = redStore.getState().login
		const res = await axios.post(`${server}/post-checkout.php`, {
			user_id: user[0].id,
			jwt,
			addressId,
			billingId,
			items,
			payment: state.checked
		})
	}

	return (
		<View>
			<Text style={{ ...Defaults.title, ...Defaults.pad }}>
				Payment Method
			</Text>
			{subTotal >= 5000000 && (
				<Text style={{ ...Styles.texts.error, ...Defaults.pad }}>
					Cash on delivery can only be selected if price is under
					5,000,000
				</Text>
			)}
			<TouchableRipple
				disabled={subTotal >= 5000000}
				style={style.item}
				rippleColor="rgba(0,0,0,0.1)"
				onPress={() => handleCheck("cash")}>
				<>
					<RadioButton
						value="cash"
						status={
							state.checked === "cash" ? "checked" : "unchecked"
						}
					/>
					<Text>Cash on delivery</Text>
				</>
			</TouchableRipple>

			<TouchableRipple
				style={style.item}
				rippleColor="rgba(0,0,0,0.1)"
				onPress={() => handleCheck("credit")}>
				<>
					<RadioButton
						value="credit"
						status={
							state.checked === "credit" ? "checked" : "unchecked"
						}
					/>
					<Text>Credit Card</Text>
				</>
			</TouchableRipple>
			<View style={Defaults.pad}>
				<Text style={Styles.texts.error}>{state.error}</Text>
				<MyButton
					text="Checkout"
					color={Defaults.secondary}
					onPress={handleSubmit}
				/>
			</View>
		</View>
	)
}

const style = StyleSheet.create({
	item: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10
	}
})

export default SelectPayment
