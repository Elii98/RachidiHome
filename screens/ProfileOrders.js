import React, { useEffect, useState } from "react"
import { Text, View, ScrollView, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { Defaults } from "../Globals/defaults"
import Item from "../components/Item"
import axios from "axios"
import { server } from "../settings"
import BackHeader from "../components/BackHeader"
import { SafeAreaView } from "react-native-safe-area-context"

const ProfileOrders = () => {
	//TODO change this later
	const userid = 1
	const [state, setState] = useState({
		items: []
	})
	useEffect(() => {
		const getOrderHistory = async () => {
			const items = await axios.get(`${server}/getOrderHistory.php`, { params: { userid } })
			setState((state) => ({ ...state, items: items.data.items }))
		}
		getOrderHistory()
	}, [])
	return (
		<SafeAreaView style={styles.container}>
			<BackHeader text="Your ORders" />
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
				<View>
					{state.items.map((item, key) => (
						<View key={key} style={styles.holder}>
							<Item
								key={key}
								image={item.image}
								title={item.title}
								newPrice={item.newprice}
								oldPrice={item.oldprice}
								itemid={item.id}
								size="full"
							/>
						</View>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 30,
		flex: 1
	},
	icon: {
		marginRight: 20
	},
	strip: {
		flexDirection: "row",
		alignItems: "center",
		paddingBottom: 10
	},
	holder: {
		marginTop: 10
	},
	content: {
		paddingVertical: 20,
		paddingHorizontal: 10
	}
})

export default ProfileOrders
