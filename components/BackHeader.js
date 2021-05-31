import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Defaults } from "../Globals/defaults"
import { useNavigation } from "@react-navigation/core"

const BackHeader = (props) => {
	const { text } = props
	const navigation = useNavigation()

	return (
		<View style={styles.back}>
			<View style={styles.strip}>
				<Pressable onPress={() => navigation.goBack()}>
					<Ionicons name="chevron-back" size={30} color="#000" />
				</Pressable>
				<Text style={Defaults.title}>{text}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	strip: {
		flexDirection: "row",
		alignItems: "center",
		paddingBottom: 10
	},
	back: {
		paddingTop: 20,
		paddingBottom: 40,
		justifyContent: "center"
	}
})

export default BackHeader
