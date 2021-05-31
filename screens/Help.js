import React from "react"
import { Text, View, ScrollView, StyleSheet } from "react-native"
import { Defaults } from "../Globals/defaults"
import Header from "../components/Header"
import WhiteTextStrip from "../components/WhiteTextStrip"

const Help = (props) => {
	const { navigation } = props
	return (
		<View>
			<Header />
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.strip}>
					<Text style={Defaults.title}>Help</Text>
				</View>
				<WhiteTextStrip text="Call us" />
				<WhiteTextStrip text="Chat using whatsapp" />
				<WhiteTextStrip text="Send us  an email" />
				<WhiteTextStrip
					onpress={() => {
						navigation.navigate("FAQ")
					}}
					text="FAQ"
				/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 30,
		paddingBottom: 200
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

export default Help
