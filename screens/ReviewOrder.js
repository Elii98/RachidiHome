import React from "react"
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
import { server } from "../settings"

const ReviewOrder = (props) => {
	const { route, navigation } = props
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
						<Image
							style={styles.img}
							source={{ uri: `${server}/medias/img1.jpg` }}
						/>
						<Image
							style={styles.img}
							source={{ uri: `${server}/medias/img1.jpg` }}
						/>
						<Image
							style={styles.img}
							source={{ uri: `${server}/medias/img1.jpg` }}
						/>
					</ScrollView>
				</View>
				<View style={styles.line}></View>
				<View>
					<View style={(styles.strip, styles.row)}>
						<Text style={styles.title}>Shipping information</Text>
						<Text style={styles.clear}>Change</Text>
					</View>
					<Text style={styles.text}>City</Text>
					<Text style={styles.text}>Street name</Text>
					<Text style={styles.text}>building name</Text>
					<Text style={styles.text}>landmark</Text>
					<Text style={styles.text}>Name</Text>
					<Text style={styles.text}>Lebanom</Text>
					<Text style={styles.text}>phone number</Text>
				</View>
				<View style={styles.line}></View>
				<View style={styles.last}>
					<View style={(styles.strip, styles.row)}>
						<Text style={styles.title}>Billing information</Text>
						<Text style={styles.clear}>Change</Text>
					</View>
					<Text style={styles.text}>City</Text>
					<Text style={styles.text}>Street name</Text>
					<Text style={styles.text}>building name</Text>
					<Text style={styles.text}>landmark</Text>
					<Text style={styles.text}>Name</Text>
					<Text style={styles.text}>Lebanom</Text>
					<Text style={styles.text}>phone number</Text>
				</View>
				<View style={styles.line}></View>
				<View>
					<View style={(styles.strip, styles.row)}>
						<Text style={styles.title}>Payment method</Text>
						<Text style={styles.clear}>Change</Text>
					</View>
					<Text style={styles.text}>Cash on delivery</Text>
				</View>
				<View style={styles.line}></View>
				<View style={styles.fees}>
					<View style={styles.row}>
						<Text>Subtotal</Text>
						<Text style={styles.price}>LBP 24,000,000</Text>
					</View>
					<View style={styles.row}>
						<Text>Additional fees</Text>
						<Text style={styles.price}>TBD</Text>
					</View>
					<View style={styles.line}></View>
					<View style={styles.row}>
						<Text style={styles.total}>Grand Total</Text>
						<Text style={styles.total}>LBP 13,499,820</Text>
					</View>
				</View>
				<MyButton
					onPress={() => navigation.navigate("Home")}
					text="Send order"
					color={Defaults.secondary}
				/>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	back: {
		paddingTop: 20,
		paddingBottom: 40,
		justifyContent: "center"
	},
	fees: {
		backgroundColor: "#fff",
		padding: 5,
		borderRadius: 5,
		marginBottom: 5
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
		marginVertical: 2
	},
	last: {
		marginBottom: 20
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginVertical: 10
	},
	price: {},
	priceLine: {
		borderBottomWidth: 1
	},
	total: {
		fontWeight: "bold",
		textTransform: "uppercase"
	}
})

export default ReviewOrder
