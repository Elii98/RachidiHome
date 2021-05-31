import React from "react"
import { View, Text } from "react-native"

const MyText = (props) => {
	return (
		<View>
			<Text style={{ fontSize: 17 }}>{props.text}</Text>
		</View>
	)
}

export default MyText
