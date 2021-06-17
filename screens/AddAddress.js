import React, { useEffect, useState } from "react"
import { Text, View, ScrollView, StyleSheet, Pressable } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { Defaults } from "../Globals/defaults"
import Input from "../components/Input"
import MyButton from "../components/MyButton"
import axios from "axios"
import { server } from "../settings"
import redStore from "../redux/store"
import { setAddresses } from "../redux/actions"

const AddAddress = (props) => {
	const { navigation, route } = props

	//TODO change later
	const userId = redStore.getState().login.user[0].id
	const [state, setState] = useState({
		nickname: "",
		city: "",
		streetname: "",
		buildingname: "",
		landmark: "",
		details: ""
	})

	const addressId = route.params?.itemid

	let pageTitle = "Add Address"
	let buttonText = "Save"

	useEffect(() => {
		if (route.params?.update === 1) {
			pageTitle = "Update your address"
			buttonText = "Update"

			setState((state) => ({ ...state, ...redStore.getState().addresses[addressId] }))
		}
	}, [])

	const handleAddAddress = async () => {
		const addresses = redStore.getState().addresses

		addresses[addressId] = state
		redStore.dispatch(setAddresses(addresses))

		axios.get(`${server}/addAddress.php`, {
			params: {
				address_id: addressId,
				nickname: state.nickname,
				city: state.city,
				streetname: state.streetname,
				buildingname: state.buildingname,
				landmark: state.landmark,
				userid: userId,
				jwt: redStore.getState().login.jwt
			}
		})

		navigation.navigate("ProfileAddress")
	}

	return (
		<View style={styles.container}>
			<View style={styles.back}>
				<Pressable onPress={() => navigation.goBack()}>
					<Icon name="angle-left" size={30} color="#000" />
				</Pressable>
				<Text style={styles.text}>{pageTitle}</Text>
			</View>
			<ScrollView>
				<View style={styles.input}>
					<Input
						onChangeText={(v) => setState({ ...state, nickname: v })}
						label="Address Nickname"
						placeholder="Address Nickname"
						defaultValue={state.nickname}
					/>
				</View>
				<View style={styles.input}>
					<Input
						onChangeText={(v) => setState({ ...state, city: v })}
						label="City"
						placeholder="City"
						defaultValue={state.city}
					/>
				</View>
				<View style={styles.input}>
					<Input
						onChangeText={(v) => setState({ ...state, streetname: v })}
						label="Street Name"
						placeholder="Street Name"
						defaultValue={state.streetname}
					/>
				</View>
				<View style={styles.input}>
					<Input
						onChangeText={(v) => setState({ ...state, buildingname: v })}
						label="Building Name"
						placeholder="Building Name"
						defaultValue={state.buildingname}
					/>
				</View>
				<View style={styles.input}>
					<Input
						onChangeText={(v) => setState({ ...state, landmark: v })}
						label="Landmark"
						placeholder="Landmark"
						defaultValue={state.landmark}
					/>
				</View>
				<View style={styles.input}>
					<Input
						onChangeText={(v) => setState({ ...state, details: v })}
						label="Address details"
						placeholder="Address details"
						defaultValue={state.details}
					/>
				</View>
				<MyButton onPress={handleAddAddress} color={Defaults.secondary} text={buttonText} />
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	back: {
		paddingTop: 50,
		paddingBottom: 40,
		flexDirection: "row"
	},
	text: {
		alignSelf: "center",
		marginLeft: 15,
		fontSize: 20,
		textTransform: "capitalize"
	},
	container: {
		paddingLeft: 30,
		paddingRight: 30,
		flex: 1
	},
	location: {
		marginTop: 30,
		flexDirection: "row",
		alignItems: "center"
	},
	input: {
		marginBottom: 10
	}
})

export default AddAddress
