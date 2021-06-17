import React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../components/Header"
import WhiteTextStrip from "../components/WhiteTextStrip"
import { Defaults } from "../Globals/defaults"
import Ionicons from "react-native-vector-icons/Ionicons"
import redStore from "../redux/store"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { login } from "../redux/actions"

const Menu = (props) => {
	const { navigation } = props

	const logout = async () => {
		try {
			await AsyncStorage.removeItem("user")
			redStore.dispatch(login())
		} catch (e) {
			console.log(`e`, e)
		}
	}

	return (
		<SafeAreaView>
			<Header />
			<ScrollView style={styles.container}>
				<View style={styles.strip}>
					<Text style={Defaults.title}>Hey, Ali</Text>
				</View>
				<View>
					<WhiteTextStrip
						onPress={() => {
							navigation.navigate("Wishlist")
						}}
						text="Wishlist"
					/>
					<WhiteTextStrip
						onPress={() => {
							logout()
						}}
						text="Signout"
					/>
					<WhiteTextStrip
						onPress={() => {
							navigation.navigate("Help")
						}}
						text="Help"
					/>
				</View>
				<View style={styles.bottomGroup}>
					<WhiteTextStrip text="Terms & Conditions" />
					<WhiteTextStrip text="Warranty policy" />
					<WhiteTextStrip text="Privacy policy" />
					<View style={styles.icons}>
						<Ionicons name="logo-facebook" size={30} color="tomato" />
						<Ionicons name="logo-instagram" size={30} color="tomato" />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	strip: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: 10
	},
	container: {
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 30
	},
	bottomGroup: {
		marginTop: 50
	},
	icons: {
		flexDirection: "row",
		justifyContent: "space-evenly"
	}
})

export default Menu
