import React, { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import Header from "../components/Header"
import Input from "../components/Input"
import BackHeader from "../components/BackHeader"
import { SafeAreaView } from "react-native-safe-area-context"
import StripItem from "../components/StripItem"
import { StatusBar } from "expo-status-bar"
import { Defaults } from "../Globals/defaults"
import axios from "axios"
import { server } from "../settings"

let timeOut = ""

const SearchPage = () => {
	const [state, setState] = useState({
		search: []
	})

	const handleSearch = async (value) => {
		clearTimeout(timeOut)
		timeOut = setTimeout(async () => {
			const r = await axios.get(`${server}/api/search.php`, {
				params: { search: value }
			})
			setState({ ...state, search: r.data.items })
		}, 500)
	}

	return (
		<SafeAreaView>
			<View style={styles.searchContainer}>
				<StatusBar style="light" />
				<Input
					placeholderTextColor={Defaults.gray}
					placeholder="Search"
					style={styles.input}
					onChangeText={handleSearch}
				/>
			</View>
			<ScrollView contentContainerStyle={styles.container}>
				<BackHeader text="Back" />
				{state.search.length > 0 ? (
					state.search.map((item, key) => (
						<StripItem
							on
							image={item.image}
							title={item.title}
							newprice={item.newprice}
							oldprice={item.oldprice}
							key={key}
							itemid={item.id}
						/>
					))
				) : (
					<View style={styles.empty}>
						<Text style={styles.emptyText}>No items</Text>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: 20,
		paddingTop: 15,
		paddingBottom: 20
	},
	searchContainer: {
		paddingVertical: 20,
		paddingHorizontal: 20,
		backgroundColor: Defaults.primary
	},
	empty: {
		textAlign: "center",
		flex: 1,
		justifyContent: "center"
	},
	emptyText: {
		color: "#777",
		fontStyle: "italic"
	}
})

export default SearchPage
