import React, { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Defaults } from "../Globals/defaults"
import { useNavigation } from "@react-navigation/core"

const BackHeader = (props) => {
	const { text, search = false } = props
	const navigation = useNavigation()
	const [state, setState] = useState({
		padding: {}
	})
	useEffect(() => {
		if (search) {
			setState((state) => ({ ...state, padding: { paddingBottom: 0, paddingTop: 0 } }))
		}
	}, [])
	return (
		<View style={[styles.back, state.padding]}>
			<View style={[styles.strip, state.padding]}>
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
