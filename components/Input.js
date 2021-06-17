import React from "react"
import { TextInput, StyleSheet, View, Text } from "react-native"
import { Defaults } from "../Globals/defaults"

const Input = (props) => {
	const { placeholder, label, secure, ...attr } = props
	return (
		<View>
			{label && (
				<View style={styles.label}>
					<Text>{label}</Text>
				</View>
			)}
			<TextInput
				secureTextEntry={secure}
				placeholderTextColor={Defaults.gray}
				placeholder={placeholder}
				{...attr}
				style={styles.input}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: Defaults.white,
		flexGrow: 1,
		borderRadius: 5,
		marginVertical: 5,
		padding: 15
	},
	label: {
		marginBottom: 5
	}
})

export default Input
