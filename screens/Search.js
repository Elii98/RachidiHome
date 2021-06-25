import React, { useEffect, useState, useRef } from "react"
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native"
import Header from "../components/Header"
import Item from "../components/Item"
import BackHeader from "../components/BackHeader"
import { Defaults } from "../Globals/defaults"
import axios from "axios"
import { server } from "../settings"
import { SafeAreaView } from "react-native-safe-area-context"
import RBSheet from "react-native-raw-bottom-sheet"
import { Pressable } from "react-native"
import Sort from "./Sort"
import Filter from "./Filter"
import { StatusBar } from "expo-status-bar"
import redStore from "../redux/store"

const Search = (props) => {
	const sortRef = useRef()
	const filterRef = useRef()
	const { route, navigation } = props
	const [state, setState] = useState({
		items: [],
		sort: redStore.getState().searchFilter.sort,
		filter: redStore.getState().searchFilter.filter
	})
	useEffect(() => {
		const unsub = redStore.subscribe(() => {
			if (redStore.getState().searchFilter.sort !== state.sort) {
				setState({
					...state,
					sort: redStore.getState().searchFilter.sort
				})
			}
			if (redStore.getState().searchFilter.filter !== state.filter) {
				setState({
					...state,
					filter: redStore.getState().searchFilter.filter
				})
			}
		})

		return () => unsub()
	}, [])
	useEffect(() => {
		const getItems = async () => {
			const r = await axios.get(`${server}/api/getCatItems.php`, {
				params: {
					id: route.params.catid,
					sort: state.sort,
					filter: state.filter
				}
			})
			setState((state) => ({ ...state, items: r.data.items }))
		}
		getItems()
	}, [state.sort, state.filter])
	console.log(
		`redStore.getState().searchFilter`,
		redStore.getState().searchFilter
	)
	console.log(`state.sort`, state.sort)
	return (
		<SafeAreaView>
			<Header />
			<ScrollView contentContainerStyle={styles.container}>
				<StatusBar style="auto" />
				<View style={styles.strip}>
					<BackHeader search={true} text={route.params?.text} />
					<View style={styles.row}>
						<Pressable
							onPress={() => {
								sortRef.current.open()
							}}
							style={[styles.iconHolder, styles.firstChild]}>
							<Text style={styles.btnText}>Sort</Text>
						</Pressable>
						<Pressable
							onPress={() => {
								filterRef.current.open()
							}}
							style={styles.iconHolder}>
							<Text style={styles.btnText}>Filter</Text>
						</Pressable>
					</View>
				</View>

				{state.items.length === 0 ? (
					<View style={styles.msg}>
						<Text style={styles.msgText}>
							There are no results that meet your filters, have
							you tried changing them?
						</Text>
					</View>
				) : (
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
				)}

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
					<Sort ref={sortRef} />
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
					<Filter ref={filterRef} />
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
		marginBottom: 10
	},
	firstChild: {
		marginRight: 10
	},
	btnText: {
		fontSize: 9
	},
	holder: {
		marginTop: 20
	},
	iconHolder: {
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderWidth: 1,
		borderRadius: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
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
	},
	msg: {
		height: 300,
		justifyContent: "center"
	},
	msgText: {
		textAlign: "center",
		color: "#888"
	}
})

export default Search
