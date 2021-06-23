import React, { useEffect, useState } from "react"
import { Text, View, ScrollView, StyleSheet } from "react-native"
import { Defaults } from "../Globals/defaults"
import Header from "../components/Header"
import WhiteTextStrip from "../components/WhiteTextStrip"
import axios from "axios"
import { server } from "../settings"

const FAQ = () => {
	const [state, setState] = useState({
		faqs: []
	})
	useEffect(() => {
		const getFAQs = async () => {
			const r = await axios.get(`${server}/apigetFAQs.php`)
			setState((state) => ({ ...state, faqs: r.data.faqs }))
		}
		getFAQs()
	}, [])
	return (
		<View>
			<Header />
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.strip}>
					<Text style={Defaults.title}>
						Frequently asked questions
					</Text>
				</View>
				{state.faqs.map((item, key) => (
					<View key={key} xId={item.id}>
						<WhiteTextStrip text={item.question} />
						<Text style={styles.answer}>{item.answer}</Text>
					</View>
				))}
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
	},
	answer: {
		textAlign: "justify",
		color: Defaults.gray,
		marginBottom: 10,
		backgroundColor: Defaults.white,
		padding: 10
	}
})

export default FAQ
