import React from "react"
import { View, Text } from "react-native"

const MyHeader = (props) => {
	return (
		<View>
			<Text style={{ fontSize: 18 }}>{props.text}</Text>
		</View>
	)
}

export default MyHeader
