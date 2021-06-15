import React from "react"
import { Text, ScrollView, View, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import Header from "../components/Header"
import { Defaults } from "../Globals/defaults"
import WhiteTextStrip from "../components/WhiteTextStrip"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"

const Profile = (props) => {
	const { route, navigation } = props
	return (
		<SafeAreaView>
			<Header />
			<ScrollView style={styles.container}>
				<StatusBar style="auto" />
				<View>
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
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 30
	}
})

export default Profile
