import React from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"
import Input from "./Input"
import { Defaults } from "../Globals/defaults"
import { useNavigation } from "@react-navigation/core"

const Header = (props) => {
	const navigation = useNavigation()
	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			<Input
				onClick={() => {
					navigation.navigate("SearchPage")
				}}
				style={styles.input}
				placeholder="Search"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
		paddingHorizontal: 20,
		backgroundColor: Defaults.primary
	}
})

export default Header
