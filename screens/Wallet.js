import React, { useEffect, useState } from "react"
import { Text, View, StyleSheet, ScrollView } from "react-native"
import { Defaults } from "../Globals/defaults"
import Icon from "react-native-vector-icons/FontAwesome"
import axios from "axios"
import { server } from "../settings"
import WhiteTextStrip from "../components/WhiteTextStrip"
import BackHeader from "../components/BackHeader"
import { SafeAreaView } from "react-native-safe-area-context"

const Wallet = () => {
	//TODO change later
	const [state, setState] = useState({
		walletpoints: []
	})
	useEffect(() => {
		const getWalletPoints = async () => {
			const userid = redStore.getState().login.user[0].id
			const jwt = redStore.getState().login.jwt
			const r = await axios.get(`${server}/getWalletPoints.php`, { params: { userid, jwt } })
			setState((state) => ({ ...state, walletpoints: r.data.walletpoints[0].walletpoints }))
		}
		getWalletPoints()
	}, [])
	return (
		<SafeAreaView style={styles.container}>
			<BackHeader text="Your wallet" />
			<ScrollView contentContainerStyle={styles.scroll}>
				<View style={styles.text}>
					<Text style={styles.light}>Your Current Balance</Text>
					<Text style={styles.balance}>LBP {state.walletpoints}</Text>
				</View>
				<View style={styles.strip}>
					<Text style={Defaults.title}>History</Text>
				</View>
				<View styles={styles.empty}>
					<WhiteTextStrip text="added 100000000" />
					<Text style={styles.emptyText}>No purchases yet</Text>
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
	icon: {
		marginRight: 20
	},
	strip: {
		flexDirection: "row",
		alignItems: "center",
		paddingBottom: 10
	},
	text: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	light: {
		color: Defaults.gray,
		marginBottom: 20
	},
	balance: {
		fontSize: 30,
		fontWeight: "bold"
	},
	empty: {
		flex: 2,
		justifyContent: "center",
		alignItems: "center"
	},
	emptyText: {}
})

export default Wallet
