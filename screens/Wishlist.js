import React, { useEffect, useState } from "react"
import { Text, View, StyleSheet, ScrollView } from "react-native"
import Header from "../components/Header"
import Item from "../components/Item"
import Icon from "react-native-vector-icons/FontAwesome"
import { Defaults } from "../Globals/defaults"
import AsyncStorage from "@react-native-async-storage/async-storage"
import redStore from "../redux/store"
import axios from "axios"
import { server } from "../settings"
import { SafeAreaView } from "react-native-safe-area-context"

const Wishlist = () => {
	const [state, setState] = useState({
		bookmarks: []
	})

	useEffect(() => {
		const getBookmarks = async () => {
			if (redStore.getState().bookmark) {
				const ids = redStore.getState().bookmark
				const r = await axios.get(`${server}/apigetBookmarks.php`, {
					params: { ids }
				})
				setState({
					...state,
					bookmarks: r.data
				})
			}
		}
		getBookmarks()

		const unsub = redStore.subscribe(() => {
			if (redStore.getState().bookmark !== state.bookmarks) {
				getBookmarks()
			}
		})
		return () => unsub()
	}, [])

	return (
		<SafeAreaView>
			<Header />
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.strip}>
					<Text style={Defaults.title}>Wishlist</Text>
					<Icon name="share-alt" size={30} color="#000" />
				</View>
				<View>
					{!state.bookmarks.length && (
						<Text style={Defaults.textEmpty}>
							You have nothing in your wishlist
						</Text>
					)}
					{state.bookmarks.map((item, key) => (
						<View key={key} style={styles.holder}>
							<Item
								image={item.image}
								title={item.title}
								newPrice={item.newprice}
								oldPrice={item.oldprice}
								itemid={item.id}
								size="full"
								icon={true}
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
	}
})

export default Wishlist
