import React, { useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import Input from "../components/Input"
import MyButton from "../components/MyButton"
import { Defaults } from "../Globals/defaults"
import DismissKeyboard from "../Globals/keyboardDismiss"
import { StatusBar } from "expo-status-bar"
import axios from "axios"
import redStore from "../redux/store"
import { login } from "../redux/actions"
import { server } from "../settings"

const Splash = (props) => {
	const { navigation } = props
	const [phone, setPhone] = useState()
	const [password, setPassword] = useState()

	const handleLogin = async () => {
		// alert(1)
		const r = await axios.get(`${server}/login.php`, { params: { phone, password } })
		if (r.data.user === 0) {
			alert(`No user`)
		} else {
			redStore.dispatch(login(r.data))
		}
	}

	return (
		<DismissKeyboard>
			<View style={[styles.container, { backgroundColor: Defaults.bg }]}>
				<StatusBar />
				<View style={[styles.container, styles.center]}>
					<Text style={styles.mainHeader}>Rachidi Home</Text>
				</View>
				<View style={styles.container}>
					<Input placeholder="Phone" onChangeText={setPhone} />
					<Input secure onChangeText={setPassword} placeholder="Password" />
					<MyButton color={Defaults.primary} onPress={handleLogin} text="Sign In" />
					<MyButton
						color={Defaults.secondary}
						onPress={() => navigation.navigate("Register")}
						text="Register"
					/>
				</View>
				<View style={[styles.container, styles.center]}>
					<Text
						style={{ padding: 15 }}
						onPress={() => navigation.navigate("ForgotPassword")}>
						Forgot password?
					</Text>
				</View>
			</View>
		</DismissKeyboard>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		justifyContent: "center",
		fontFamily: "Poppins"
	},
	mainHeader: {
		fontSize: 24,
		fontWeight: "bold",
		textTransform: "uppercase"
	},
	center: {
		alignItems: "center"
	}
})

export default Splash
