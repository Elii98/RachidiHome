import axios from "axios"
import React, { useEffect, useState } from "react"
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Icon from "react-native-vector-icons/FontAwesome"
import { Defaults } from "../Globals/defaults"
import { server } from "../settings"
import BackHeader from "../components/BackHeader"
import redStore from "../redux/store"

const ProfileAddress = (props) => {
	const { route, navigation } = props
	const [state, setState] = useState({
		addresses: [],
		active: 0
	})
	useEffect(() => {
		const getAddresses = async () => {
			const userId = redStore.getState().login.user[0].id
			const r = await axios.get(`${server}/getAddresses.php`, { params: { userId } })
			setState((state) => ({ ...state, addresses: r.data.addresses }))
		}
		getAddresses()
	}, [state.active])
	const handleChangeMain = async (id) => {
		const userId = redStore.getState().login.user[0].id
		const r = await axios.get(`${server}/changeMainAddress.php`, {
			params: { addressid: id, userid: userId }
		})
		setState({ ...state, active: id })
	}
	return (
		<SafeAreaView style={styles.container}>
			<BackHeader text=" Your addresses" />
			{/* <View style={styles.centerText}>
				<Text style={styles.empty}>No address added yet click on the plus</Text>
			</View> */}
			<ScrollView>
				{state.addresses.map((item, key) => (
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("AddAddress", { itemid: item.id, update: 1 })
						}}
						key={key}
						itemid={item.id}
						style={styles.item}>
						<Text style={styles.title}>{item.nickname}</Text>
						{item.ismain === "1" && (
							<TouchableOpacity style={styles.sub}>
								<Text style={styles.btnText}>Main address</Text>
							</TouchableOpacity>
						)}
						{item.ismain !== "1" && (
							<TouchableOpacity
								style={[styles.sub, styles.subNot]}
								onPress={() => {
									handleChangeMain(item.id)
								}}>
								<Text style={styles.btnText}>Make main address</Text>
							</TouchableOpacity>
						)}
					</TouchableOpacity>
				))}
			</ScrollView>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("AddAddress")
				}}>
				<View style={styles.btn}>
					<Icon name="plus" size={30} color={Defaults.white} />
				</View>
			</TouchableOpacity>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	item: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: Defaults.white,
		marginBottom: 10
	},
	title: {
		fontSize: 20,
		textTransform: "capitalize",
		padding: 10
	},
	sub: {
		fontSize: 10,
		alignItems: "center",
		height: "100%",
		backgroundColor: Defaults.primary,
		flexDirection: "row",
		padding: 5
	},
	subNot: {
		backgroundColor: Defaults.secondary
	},
	strip: {
		flexDirection: "row",
		alignItems: "center",
		paddingBottom: 10
	},
	text: {
		alignSelf: "center",
		marginLeft: 15,
		fontSize: 20,
		textTransform: "capitalize"
	},
	centerText: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	empty: {
		color: Defaults.gray,
		fontStyle: "italic"
	},
	btn: {
		padding: 20,
		borderRadius: 5,
		backgroundColor: Defaults.primary,
		position: "absolute",
		bottom: 50,
		right: 20
	},
	btnText: {
		color: Defaults.white
	},
	container: {
		flex: 1,
		paddingHorizontal: 30
	}
})

export default ProfileAddress
