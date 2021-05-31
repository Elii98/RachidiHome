import React, { useState } from "react"
import { Pressable, StyleSheet, Text } from "react-native"
import { Defaults } from "../Globals/defaults"
import Icon from "react-native-vector-icons/FontAwesome"

const Checkbox = (props) => {
	const { checked } = props
	const [state, setState] = useState({ checked })
	const handlePress = () => {
		setState({
			...state,
			checked: !state.checked
		})
	}

	return (
		<Pressable style={styles.checkBox} checked={state.checked} onPress={handlePress}>
			<Text>{state.checked ? <Icon name="check" size={25} color="#000" /> : ""}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	checkBox: {
		width: 25,
		height: 25,
		backgroundColor: Defaults.white,
		borderRadius: 5
	}
})

export default Checkbox
