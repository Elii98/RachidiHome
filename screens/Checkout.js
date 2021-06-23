import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import {
	Pressable,
	ScrollView,
	StyleSheet,
	View,
	Text,
	Image
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Ionicons from "react-native-vector-icons/Ionicons"
import MyButton from "../components/MyButton"
import { Defaults } from "../Globals/defaults"
import { setAddresses } from "../redux/actions"
import redStore from "../redux/store"
import { server } from "../settings"
import RBSheet from "react-native-raw-bottom-sheet"
import SelectAddress from "../components/SelectAddress/SelectAddress"
import SelectPayment from "./SelectPayment"

const Checkout = (props) => {
	const { route, navigation } = props
	const [state, setState] = useState({
		cartItems: redStore.getState().cartItems,
		addressId: 0,
		billingId: 0,
		subTotal: 0,
		address: {},
		billing: {}
	})

	const changeRef = useRef()
	const paymentRef = useRef()

	useEffect(() => {
		const getData = async () => {
			const { user, jwt } = redStore.getState().login
			const cartItems = redStore.getState().cartItems
			let subTotal = 0

			for (let k in cartItems) {
				subTotal += Number(cartItems[k].newprice) * cartItems[k].counter
			}

			const res = await axios.get(`${server}/apigetAddresses.php`, {
				params: { userId: user[0].id, jwt }
			})
			redStore.dispatch(setAddresses(res.data.addresses))
			let activeAddress = {}
			for (let k in res.data.addresses) {
				if (res.data.addresses[k].ismain === "1") {
					activeAddress = res.data.addresses[k]
				}
			}
			setState((state) => ({
				...state,
				addressId: activeAddress.id,
				billingId: activeAddress.id,
				address: {
					"Nick Name": activeAddress.nickname,
					City: activeAddress.city,
					"Street Name": activeAddress.streetname,
					"Building Name": activeAddress.buildingname,
					Landmark: activeAddress.landmark
				},
				billing: {
					"Nick Name": activeAddress.nickname,
					City: activeAddress.city,
					"Street Name": activeAddress.streetname,
					"Building Name": activeAddress.buildingname,
					Landmark: activeAddress.landmark
				},
				subTotal
			}))
		}
		getData()
	}, [])

	const changeAddress = (id) => {
		const activeAddress = redStore.getState().addresses[id]
		setState({
			...state,
			[`${state.change}Id`]: id,
			[state.change]: {
				"Nick Name": activeAddress.nickname,
				City: activeAddress.city,
				"Street Name": activeAddress.streetname,
				"Building Name": activeAddress.buildingname,
				Landmark: activeAddress.landmark
			}
		})
	}

	return (
		<SafeAreaView style={styles.area}>
			<ScrollView style={{ flex: 1, paddingLeft: 30, paddingRight: 30 }}>
				<View style={styles.back}>
					<View style={{ flexDirection: "row" }}>
						<Pressable onPress={() => navigation.goBack()}>
							<Ionicons
								name="chevron-back"
								size={30}
								color="#000"
							/>
						</Pressable>
						<Text
							style={{
								alignSelf: "center",
								marginLeft: 15,
								fontSize: 20
							}}>
							Checkout ...
						</Text>
					</View>
				</View>
				<View>
					<View style={styles.strip}>
						<Text style={styles.title}>Cart items</Text>
					</View>
					<ScrollView
						showsHorizontalScrollIndicator={false}
						horizontal={true}>
						{Object.values(state.cartItems).map((item, k) => (
							<Image
								key={k}
								style={styles.img}
								source={{
									uri: `${server}/medias/${item.image}`
								}}
							/>
						))}
					</ScrollView>
				</View>
				<View style={styles.line}></View>
				<View>
					<View style={(styles.strip, styles.row)}>
						<Text style={styles.title}>Shipping information</Text>
						<MyButton
							text="Change"
							color={Defaults.secondary}
							size="small"
							onPress={() => {
								setState({ ...state, change: "address" })
								changeRef.current.open()
							}}
						/>
					</View>
					<View style={styles.grid}>
						{Object.keys(state.address).map((key, k) => (
							<React.Fragment key={k}>
								<Text style={styles.text}>{key}</Text>
								<Text style={styles.text}>
									{state.address[key]}
								</Text>
							</React.Fragment>
						))}
					</View>
				</View>
				<View style={styles.line}></View>
				<View style={styles.last}>
					<View style={(styles.strip, styles.row)}>
						<Text style={styles.title}>Billing information</Text>
						<MyButton
							text="Change"
							color={Defaults.secondary}
							size="small"
							onPress={() => {
								setState({ ...state, change: "billing" })
								changeRef.current.open()
							}}
						/>
					</View>
					<View style={styles.grid}>
						{Object.keys(state.billing).map((key, k) => (
							<React.Fragment key={k}>
								<Text style={styles.text}>{key}</Text>
								<Text style={styles.text}>
									{state.billing[key]}
								</Text>
							</React.Fragment>
						))}
					</View>
				</View>
				<MyButton
					onPress={() => paymentRef.current.open()}
					text="Select payment method"
					color={Defaults.secondary}
				/>
			</ScrollView>
			<RBSheet
				ref={changeRef}
				closeOnDragDown
				dragFromTopOnly
				animationType="slide"
				height={350}
				customStyles={{
					draggableIcon: {
						backgroundColor: "#000"
					},
					container: {
						backgroundColor: "white"
					}
				}}>
				<SelectAddress
					close={() => changeRef.current.close()}
					changeAddress={changeAddress}
				/>
			</RBSheet>
			<RBSheet
				ref={paymentRef}
				closeOnDragDown
				dragFromTopOnly
				animationType="slide"
				height={350}
				customStyles={{
					draggableIcon: {
						backgroundColor: "#000"
					},
					container: {
						backgroundColor: "white"
					}
				}}>
				<SelectPayment
					navigation={navigation}
					addressId={state.addressId}
					billingId={state.billingId}
					items={state.cartItems}
					subTotal={state.subTotal}
					close={() => paymentRef.current.close()}
				/>
			</RBSheet>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	back: {
		paddingTop: 20,
		paddingBottom: 40,
		justifyContent: "center"
	},
	area: {
		flex: 1
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		textTransform: "uppercase"
	},
	img: {
		width: 150,
		height: 100,
		marginRight: 5
	},
	line: {
		borderBottomColor: Defaults.gray,
		borderBottomWidth: 1,
		marginVertical: 10
	},
	strip: {
		marginBottom: 10
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	clear: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderWidth: 1
	},
	text: {
		marginVertical: 2,
		width: "50%"
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between"
	},
	last: {
		marginBottom: 20
	}
})

export default Checkout
