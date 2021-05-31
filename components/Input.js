import React from "react"
import { TextInput, StyleSheet, Dimensions } from "react-native"
import { Defaults } from "../Globals/defaults"

const Input = (props) => {
	const { placeholder, secure, ...attr } = props
	return (
		<TextInput
			secureTextEntry={secure}
			placeholderTextColor={Defaults.gray}
			placeholder={placeholder}
			{...attr}
			style={styles.input}
		/>
	)
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: Defaults.white,
		flexGrow: 1,
		borderRadius: 5,
		marginVertical: 5,
		padding: 15
	}
})

export default Input
