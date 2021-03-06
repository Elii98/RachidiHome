import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { TouchableRipple } from "react-native-paper"
import { Defaults } from "../Globals/defaults"

const MyButton = (props) => {
	const { text, color, center, size, style, ...attr } = props

	let sizeStyle = {}
	switch (size) {
		case "small": {
			sizeStyle = styles.small
			break
		}
		default: {
			sizeStyle = styles.medium
			break
		}
	}

	const centerStyle = center ? styles.pos : {}

	return (
		<View
			style={{
				...styles.btn,
				backgroundColor: color,
				...style,
				...centerStyle
			}}>
			<TouchableRipple
				style={{ ...sizeStyle, ...centerStyle }}
				rippleColor="rgba(255, 255, 255, .32)"
				{...attr}>
				<Text style={styles.text}>{text}</Text>
			</TouchableRipple>
		</View>
	)
}

const styles = StyleSheet.create({
	btn: {
		borderRadius: 5,
		overflow: "hidden",
		marginVertical: 5
	},
	medium: {
		padding: 15
	},
	small: {
		padding: 5,
		paddingHorizontal: 10
	},
	text: {
		textAlign: "center",
		color: Defaults.white,
		textTransform: "uppercase"
	},
	pos: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}
})
export default MyButton
