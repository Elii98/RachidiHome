import React from "react"
import { Text, View, StyleSheet, Pressable } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import Input from "../components/Input"
import MyButton from "../components/MyButton"
import { Defaults } from "../Globals/defaults"

const ForgotPassword = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.back}>
				<View style={{ flexDirection: "row" }}>
					<Pressable onPress={() => navigation.goBack()}>
						<Icon name="angle-left" size={30} color="#000" />
					</Pressable>
					<Text style={styles.text}>Forgot your password</Text>
				</View>
			</View>
			<View style={{ justifyContent: "center" }}>
				<Text style={{ marginTop: 30, marginBottom: 30, alignSelf: "flex-start" }}>
					We will send you an email with all the information
				</Text>
				<Input placeholder="Email" />
			</View>
			<MyButton text="Recover password" color={Defaults.secondary} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 30,
		paddingRight: 30
	},
	back: {
		paddingTop: 50,
		paddingBottom: 40,
		justifyContent: "center"
	},
	text: {
		alignSelf: "center",
		marginLeft: 15,
		fontSize: 20,
		textTransform: "capitalize"
	}
})

export default ForgotPassword
