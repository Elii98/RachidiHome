import React, { useEffect, useState } from "react"
import { Text, View, ScrollView, StyleSheet } from "react-native"
import Header from "../components/Header"
import { Defaults } from "../Globals/defaults"
import Category from "../components/Category"
import axios from "axios"
import { server } from "../settings"

const Categories = (props) => {
	const { navigation } = props
	const [state, setState] = useState({
		categories: []
	})

	useEffect(() => {
		const getCategories = async () => {
			const r = await axios.get(`${server}/getCategories.php`)
			setState((state) => ({ ...state, categories: r.data.category }))
		}
		getCategories()
	}, [])

	return (
		<View>
			<Header />
			<ScrollView style={styles.container}>
				<View style={styles.strip}>
					<Text style={Defaults.title}>Categories</Text>
				</View>
				<View>
					<View style={styles.holder}>
						{state.categories.map((item, key) => (
							<Category
								key={key}
								image={item.image}
								width="full"
								text={item.name}
								itemid={item.id}
							/>
						))}
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 30
	},
	strip: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: 10
	},
	holder: {
		marginBottom: 10
	}
})

export default Categories
