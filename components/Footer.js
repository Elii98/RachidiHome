import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Defaults } from "../Globals/defaults"
import Icon from "react-native-vector-icons/FontAwesome"

const Footer = () => {
	return (
		<View style={styles.container}>
			<Icon style={styles.icon} name="rocket" color="#fff" size={20} />
			<Icon style={styles.icon} name="rocket" color="#fff" size={20} />
			<Icon style={styles.icon} name="rocket" color="#fff" size={20} />
			<Icon style={styles.icon} name="rocket" color="#fff" size={20} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 50,
		paddingBottom: 50,
		backgroundColor: Defaults.white,
		flexDirection: "row",
		justifyContent: "space-between",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30
	},
	icon: {
		padding: 30,
		backgroundColor: Defaults.black,
		margin: 5
	}
})

export default Footer
