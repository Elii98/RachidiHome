import React, { useEffect, useState, useRef } from "react"
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native"
import Header from "../components/Header"
import Item from "../components/Item"
import { Defaults } from "../Globals/defaults"
import Icon from "react-native-vector-icons/FontAwesome"
import axios from "axios"
import { server } from "../settings"
import { SafeAreaView } from "react-native-safe-area-context"
import RBSheet from "react-native-raw-bottom-sheet"
import { Pressable } from "react-native"
import Sort from "./Sort"
import Filter from "./Filter"
import { StatusBar } from "expo-status-bar"

const Search = (props) => {
	const sortRef = useRef()
	const filterRef = useRef()
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
				<StatusBar style="auto" />
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
				</View>

				<View style={styles.row}>
					<Pressable
						onPress={() => {
							sortRef.current.open()
						}}
						style={[styles.iconHolder, styles.firstChild]}>
						<Text style={styles.clear}>Sort</Text>
					</Pressable>
					<Pressable
						onPress={() => {
							filterRef.current.open()
						}}
						style={styles.iconHolder}>
						<Text style={styles.clear}>Filter</Text>
					</Pressable>
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
				<RBSheet
					ref={sortRef}
					closeOnDragDown={true}
					closeOnPressMask={false}
					animationType="fade"
					closeOnPressMask={true}
					closeOnPressBack={true}
					height={350}
					customStyles={{
						wrapper: {
							backgroundColor: "rgba(0,0,0,0.5)"
						},
						draggableIcon: {
							backgroundColor: "#000"
						},
						container: {
							backgroundColor: Defaults.bg
						}
					}}>
					<Sort />
				</RBSheet>
				<RBSheet
					ref={filterRef}
					closeOnDragDown={true}
					closeOnPressMask={false}
					animationType="fade"
					closeOnPressMask={true}
					closeOnPressBack={true}
					height={350}
					customStyles={{
						wrapper: {
							backgroundColor: "rgba(0,0,0,0.5)"
						},
						draggableIcon: {
							backgroundColor: "#000"
						},
						container: {
							backgroundColor: Defaults.bg
						}
					}}>
					<Filter />
				</RBSheet>
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
	firstChild: {
		marginRight: 10
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
		flexGrow: 1
	},
	row: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between"
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
