import { useNavigation } from "@react-navigation/core"
import React from "react"
import {
	Image,
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback
} from "react-native"
import { Defaults } from "../Globals/defaults"
import { server } from "../settings"

const Category = (props) => {
	const navigation = useNavigation()
	const { text, image = "", itemid } = props
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				navigation.navigate("Search", { catid: itemid, text: text })
			}}>
			<View style={styles.container}>
				<Image
					style={styles.img}
					source={{ uri: `${server}/media/${image}` }}
				/>
				<View style={styles.overlay}></View>
				<Text style={styles.title}>{text}</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
		height: 150
	},
	img: {
		width: "100%",
		height: "100%"
	},
	title: {
		position: "absolute",
		color: Defaults.white,
		fontWeight: "bold",
		fontSize: 20
	},
	overlay: {
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0,0,0,0.8)",
		position: "absolute",
		top: 0,
		left: 0
	}
})

export default Category
