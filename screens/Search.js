import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native"
import Header from "../components/Header"
import Item from "../components/Item"
import { Defaults } from "../Globals/defaults"
import Icon from "react-native-vector-icons/FontAwesome"
import axios from "axios"
import { server } from "../settings"
import { SafeAreaView } from "react-native-safe-area-context"

const Search = (props) => {
	const { route, navigation } = props
	const [state, setState] = useState({
		items: []
	})
	useEffect(() => {
		const getItems = async () => {
			const r = await axios.get(`${server}/getCatItems.php`, {
				params: { id: route.params.catid }
			})
			setState((state) => ({ ...state, items: r.data.items }))
		}
		getItems()
	}, [])

	return (
		<SafeAreaView>
			<Header />
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.strip}>
					<View style={styles.title}>
						<Icon
							onPress={() => navigation.goBack()}
							style={styles.icon}
							name="angle-left"
							size={30}
						/>
						<Text style={Defaults.title}>{route.params.text}</Text>
					</View>
					<View style={styles.row}>
						<View style={styles.iconHolder}>
							<Icon style={styles.icon} name="angle-down" size={20} />
							<Text style={styles.clear}>Sort</Text>
						</View>
						<View style={styles.iconHolder}>
							<Icon style={styles.icon} name="angle-down" size={20} />
							<Text style={styles.clear}>Filter</Text>
						</View>
					</View>
				</View>
				<View style={styles.content}>
					{state.items.map((item, key) => (
						<View key={key} style={styles.holder}>
							<Item
								size="full"
								image={item.image}
								title={item.title}
								newPrice={item.newprice}
								oldPrice={item.oldprice}
								itemid={item.id}
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
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 30,
		paddingBottom: 120
	},
	strip: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: 10
	},
	holder: {
		marginTop: 20
	},
	iconHolder: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderWidth: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginHorizontal: 10
	},
	row: {
		flexDirection: "row"
	},
	title: {
		flexDirection: "row",
		alignItems: "center"
	},
	icon: {
		marginRight: 10
	}
})

export default Search
