import React, { useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Defaults } from "../Globals/defaults"
import Mybutton from "../components/MyButton"
import Icon from "react-native-vector-icons/FontAwesome"
import Counter from "../components/Counter"
import { SafeAreaView } from "react-native-safe-area-context"
import axios from "axios"
import { server } from "../settings"
import redStore from "../redux/store"
import Ionicons from "react-native-vector-icons/Ionicons"
import { bookmark, addCartItem } from "../redux/actions"

const ItemDetails = (props) => {
	const { navigation, route } = props
	const { itemId } = route.params
	const [button, setButton] = useState(false)
	const [cartCounter, setCartCounter] = useState(0)
	const [state, setState] = useState({
		item: [],
		bookmarked: false
	})
	useEffect(() => {
		const getItem = async () => {
			const r = await axios.get(`${server}/getItems.php`, { params: { itemid: itemId } })
			setState((state) => ({ ...state, item: r.data.item[0] }))
		}
		getItem()

		const unsub = redStore.subscribe(() => {
			if (redStore.getState().count > 0) {
				setButton(true)
			} else {
				setButton(false)
			}
		})
		let bookmarkArr = redStore.getState().bookmark
		if (bookmarkArr) {
			if (bookmarkArr.includes(itemId)) {
				setState({ ...state, bookmarked: true })
			} else {
				setState({ ...state, bookmarked: false })
			}
		}

		if (redStore.getState().cartItems) {
			const data = redStore.getState().cartItems
			setCartCounter(data[itemId])
		}
		return () => unsub()
	}, [])

	const addBookmark = () => {
		redStore.dispatch(bookmark({ itemId, flag: !state.bookmarked }))
		setState({
			...state,
			bookmarked: !state.bookmarked
		})
	}

	const addToCart = () => {
		let itemArr = {}
		itemArr[itemId] = redStore.getState().count
		redStore.dispatch(addCartItem(itemArr))
	}
	return (
		<SafeAreaView contentContainerStyle={styles.container}>
			<ScrollView>
				<View style={styles.imgHolder}>
					<Icon
						onPress={() => navigation.pop()}
						name="angle-left"
						size={30}
						color={Defaults.white}
						style={styles.back}
					/>
					{state.item.image && (
						<Image
							style={styles.img}
							source={{ uri: `${server}/imgs/${state.item.image}` }}
						/>
					)}
				</View>
				<View style={styles.content}>
					<View style={styles.stripHolder}>
						<Text style={styles.tag}>20% Off</Text>
						<View style={styles.iconHolder}>
							<Ionicons
								name="share-social-outline"
								size={30}
								color="#000"
								style={styles.icon}
							/>
							{state.bookmarked ? (
								<Ionicons
									name="bookmark"
									color="#000"
									size={30}
									style={styles.icon}
									onPress={() => {
										addBookmark()
									}}
								/>
							) : (
								<Ionicons
									name="bookmark-outline"
									color="#000"
									size={30}
									style={styles.icon}
									onPress={() => {
										addBookmark()
									}}
								/>
							)}
						</View>
					</View>
					<View style={styles.top}>
						<Text style={styles.title}>{state.item.title}</Text>
						<View style={styles.starHolder}>
							<Icon style={styles.star} name="star" size={20} />
							<Icon style={styles.star} name="star" size={20} />
							<Icon style={styles.star} name="star" size={20} />
							<Icon style={styles.star} name="star" size={20} />
							<Icon style={styles.star} name="star" size={20} />
						</View>
						<Text style={styles.old}>
							LBP {Number(state.item.oldprice).toLocaleString()}
						</Text>
						<View style={styles.priceHolder}>
							<Text style={styles.new}>
								LBP {Number(state.item.newprice).toLocaleString()}
							</Text>
							<View style={styles.counter}>
								<Counter start={cartCounter} />
							</View>
						</View>
						{button ? (
							<View style={styles.btnHolder}>
								<Mybutton
									onpress={() => {
										addToCart()
									}}
									text="Add to cart"
									color={Defaults.secondary}
								/>
							</View>
						) : (
							<View style={styles.btnHolder}>
								<Mybutton
									text="Add to cart"
									Disabled={true}
									color={Defaults.gray}
								/>
							</View>
						)}

						<View style={styles.line}></View>
					</View>
					<View style={styles.bottom}>
						<View style={styles.contentHolder}>
							<Text style={styles.contentTitle}>Delivery Time</Text>
							<Text style={styles.contentDesc}>{state.item.deliverytime}</Text>
						</View>
						<View style={styles.contentHolder}>
							<Text style={styles.contentTitle}>Description</Text>
							<Text style={styles.contentDesc}>{state.item.description}</Text>
						</View>
						<View style={styles.contentHolder}>
							<Text style={styles.contentTitle}>SPECIFICATIONS</Text>
							<Text style={styles.contentDesc}>{state.item.specifications}</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	content: {
		padding: 20
	},
	imgHolder: {
		position: "relative"
	},
	img: {
		width: "100%",
		height: 300,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30
	},
	back: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		position: "absolute",
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 10,
		overflow: "hidden",
		zIndex: 2,
		left: 20,
		top: 20
	},
	stripHolder: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	tag: {
		padding: 5,
		backgroundColor: "#C8D7F4",
		borderRadius: 5,
		overflow: "hidden",
		color: "#2455B2"
	},
	iconHolder: {
		flexDirection: "row"
	},
	icon: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		marginRight: 5
	},
	top: {
		marginTop: 10
	},
	title: {
		fontWeight: "bold",
		fontSize: 20
	},
	starHolder: {
		flexDirection: "row",
		marginBottom: 10
	},
	priceHolder: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	star: {
		color: "#D6CF36"
	},
	old: {
		color: Defaults.gray,
		textDecorationLine: "line-through"
	},
	new: {
		fontWeight: "bold",
		fontSize: 18
	},
	btnHolder: {
		marginVertical: 20
	},
	line: {
		borderBottomColor: Defaults.gray,
		borderBottomWidth: 1
	},
	contentHolder: {
		marginVertical: 20
	},
	contentTitle: {
		fontSize: 18,
		fontWeight: "bold",
		textTransform: "uppercase"
	},
	contentDesc: {
		color: Defaults.gray,
		marginTop: 5,
		textAlign: "justify"
	}
})

export default ItemDetails
