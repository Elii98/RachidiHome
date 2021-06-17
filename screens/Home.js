import React, { useEffect, useState, useRef } from "react"
import Header from "../components/Header"
import { SafeAreaView } from "react-native-safe-area-context"
import BannerImgs from "../components/BannerImgs"
import { StyleSheet, Text, View, ScrollView, RefreshControl } from "react-native"
import Item from "../components/Item"
import Category from "../components/Category"
import { StatusBar } from "expo-status-bar"
import { server } from "../settings"
import axios from "axios"
import { Defaults } from "../Globals/defaults"

const Home = (props) => {
	const [state, setState] = useState({
		banners: [],
		firstItems: [],
		secondItems: [],
		categories: []
	})

	useEffect(() => {
		getHome()
	}, [getHome])

	const getHome = async () => {
		const banners = await axios.post(`${server}/getBanners.php`)
		const categories = await axios.get(`${server}/getCategories.php`)
		const items = await axios.get(`${server}/getItems.php`)

		setState((state) => ({
			...state,
			banners: banners.data.banners,
			categories: categories.data.category,
			firstItems: items.data.firstItems,
			secondItems: items.data.secondItems
		}))
	}

	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = () => {
		setRefreshing(true)
		getHome().then(() => setRefreshing(false))
	}

	return (
		<SafeAreaView>
			<Header />
			<ScrollView
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				<StatusBar style="auto" />
				<BannerImgs image={state.banners[0]?.image} xId={state.banners[0]?.itemid} />
				<View style={styles.container}>
					<Text style={styles.title}>Offers</Text>
					<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
						{!state.firstItems.length && (
							<Text style={Defaults.textEmpty}>There are no offers</Text>
						)}
						{state.firstItems.map((item, key) => (
							<Item
								key={key}
								image={item.image}
								title={item.title}
								newPrice={item.newprice}
								oldPrice={item.oldprice}
								itemid={item.id}
							/>
						))}
					</ScrollView>
				</View>
				<BannerImgs image={state.banners[1]?.image} xId={state.banners[1]?.itemid} />
				<View style={styles.container}>
					<Text style={styles.title}>Search by category</Text>
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
				<BannerImgs image={state.banners[2]?.image} xId={state.banners[2]?.itemid} />
				<View style={styles.container}>
					<Text style={styles.title}>new arrivals</Text>
					<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
						{!state.secondItems.length && (
							<Text style={Defaults.textEmpty}>There are no new arrivals</Text>
						)}
						{state.secondItems.map((item, key) => (
							<Item
								key={key}
								xId={item.id}
								image={item.image}
								title={item.title}
								newPrice={item.newprice}
								oldPrice={item.oldprice}
								itemid={item.id}
							/>
						))}
					</ScrollView>
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
		paddingBottom: 200
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		textTransform: "uppercase",
		paddingBottom: 10
	}
})

export default Home
