import React, { useEffect, useState } from "react"
import { Text, View, Pressable, StyleSheet, ScrollView } from "react-native"
import Input from "../components/Input"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Defaults } from "../Globals/defaults"
import MyButton from "../components/MyButton"
import Checkbox from "../components/CheckBox"
import { SafeAreaView } from "react-native-safe-area-context"
import axios from "axios"
import { server } from "../settings"
import BackHeader from "../components/BackHeader"
import redStore from "../redux/store"

const Register = (props) => {
	const { route } = props

	const [state, setState] = useState({
		firstName: [],
		lastName: [],
		phone: [],
		password: [],
		confirmPassword: [],
		check: [],
		user: {
			first_name: "",
			last_name: "",
			phone_number: "",
			password: ""
		}
	})

	let pageTitle = "Create an account ..."
	let buttonText = "Register"
	let showConfirm = true

	if (route.params?.update === 1) {
		pageTitle = "Account Info ..."
		buttonText = "Update"
		showConfirm = false

		useEffect(() => {
			const getUser = async () => {
				const userData = redStore.getState().login.user[0].id
				const r = await axios.get(`${server}/getUser.php`, { params: { id: userData } })
				setState({ ...state, user: r.data.user[0] })
			}
			getUser()
		}, [])
	}

	const handleRegister = async () => {
		const r = await axios.get(`${server}/register.php`, {
			params: {
				firstName: state.firstName,
				lastName: state.lastName,
				phone: state.phone,
				password: state.password
			}
		})
	}

	return (
		<SafeAreaView style={styles.container}>
			<BackHeader text={pageTitle} />
			<ScrollView style={{ flex: 1 }}>
				<View>
					<Input
						style={styles.input}
						label="First Name"
						onChangeText={(value) => {
							setState({ ...state, user: { first_name: value } })
						}}
						placeholder="First Name"
						value={state.user.first_name}
					/>
					<Input
						style={styles.input}
						label="Last Name"
						placeholder="Last Name"
						onChangeText={(value) => {
							setState({ ...state, user: { last_name: value } })
						}}
						value={state.user.last_name}
					/>
					<Input
						style={styles.input}
						label="Phone Number"
						placeholder="Phone Number"
						onChangeText={(value) => {
							setState({ ...state, user: { phone_number: value } })
						}}
						value={state.user.phone_number}
					/>
					{!redStore.getState().login?.user && (
						<>
							<Input
								style={styles.input}
								placeholder="Password"
								onChangeText={(value) => {
									setState({ ...state, user: { password: value } })
								}}
							/>
							<Input
								style={styles.input}
								placeholder="Confirm password"
								onChangeText={(value) => {
									setState({ ...state, confirmPassword: value })
								}}
							/>
							{showConfirm && (
								<View
									style={{
										flexDirection: "row",
										alignSelf: "flex-start",
										marginTop: 10,
										marginBottom: 30
									}}>
									<Checkbox checked={false} />
									<Text style={{ marginLeft: 15 }}>
										By clicking i agree, you confirm that you have read our
										terms and services
									</Text>
								</View>
							)}
						</>
					)}
					<MyButton
						onPress={handleRegister}
						text={buttonText}
						color={Defaults.secondary}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 30
	},
	input: {
		marginBottom: 10
	}
})

export default Register
