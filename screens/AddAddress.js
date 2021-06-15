import React, { useState } from "react"
import { Text, View, ScrollView, StyleSheet, Pressable, TextInput } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { Defaults } from "../Globals/defaults"
import Input from "../components/Input"
import MyButton from "../components/MyButton"
import axios from "axios"
import { server } from "../settings"
import redStore from "../redux/store"

const AddAddress = (props) => {
	const { navigation } = props
	//TODO change later
	const userId = redStore.getState().login.user[0].id
	const [state, setState] = useState({
		nickname: [],
		city: [],
		streetname: [],
		buildingname: [],
		landmark: []
	})

	let pageTitle = "Add Address"
	let buttonText = "Save"
	let buttonFunc = {}

	if (route.params?.update === 1) {
		pageTitle = "Update your address"
		buttonText = "Update"

		useEffect(() => {
			const getUser = async () => {
				const addressId = route.params.itemid
				const r = await axios.get(`${server}/getUser.php`, {
					params: { addressId: addressId }
				})
				setState({ ...state, user: r.data.user[0] })
			}
			getUser()
		}, [])
	}

	const handleAddAddress = async () => {
		const r = await axios.get(`${server}/addAddress.php`, {
			params: {
				nickname: state.nickname,
				city: state.city,
				streetname: state.streetname,
				buildingname: state.buildingname,
				landmark: state.landmark,
				userid: userId
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
				<Input
					onChangeText={(v) => setState({ ...state, nickname: v })}
					placeholder="Address Nickname"
				/>
				<Input onChangeText={(v) => setState({ ...state, city: v })} placeholder="City" />
				<Input
					onChangeText={(v) => setState({ ...state, streetname: v })}
					placeholder="Street Name"
				/>
				<Input
					onChangeText={(v) => setState({ ...state, buildingname: v })}
					placeholder="Building Name"
				/>
				<Input
					onChangeText={(v) => setState({ ...state, landmark: v })}
					placeholder="Landmark"
				/>
				<View style={styles.location}>
					<TextInput
						placeholderTextColor={Defaults.black}
						placeholder="Location on map"
						style={styles.input}
					/>
				</View>
			</ScrollView>
			<View style={{ flex: 2 }}>
				<MyButton onPress={handleAddAddress} color={Defaults.secondary} text={buttonText} />
			</View>
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
		backgroundColor: Defaults.white,
		width: "100%",
		flexShrink: 1,
		borderRadius: 5,
		margin: 5,
		padding: 15
	}
})

export default AddAddress
