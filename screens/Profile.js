import React from "react"
import { Text, ScrollView, View, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import Header from "../components/Header"
import { Defaults } from "../Globals/defaults"
import WhiteTextStrip from "../components/WhiteTextStrip"

const Profile = (props) => {
	const { route, navigation } = props
	return (
		<ScrollView style={{ backgroundColor: Defaults.bg }}>
			<Header />
			<View style={styles.container}>
				<WhiteTextStrip
					onpress={() => {
						navigation.navigate("Register", { update: 1 })
					}}
					text="Account info"
				/>
				<WhiteTextStrip
					onpress={() => {
						navigation.navigate("ProfileAddress", { userid: 1 })
					}}
					text="Addresses book"
				/>
				<WhiteTextStrip
					onpress={() => {
						navigation.navigate("ProfileOrders")
					}}
					text="My orders"
				/>
				<WhiteTextStrip
					onpress={() => {
						navigation.navigate("Wallet")
					}}
					text="Wallet"
				/>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 30
	}
})

export default Profile
