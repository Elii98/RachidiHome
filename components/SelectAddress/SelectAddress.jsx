import React, { useState } from "react"
import { useEffect } from "react"
import { Text, View } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { Defaults } from "../../Globals/defaults"
import redStore from "../../redux/store"
import MyButton from "../MyButton"
import Styles from "./Styles"

const SelectAddress = (props) => {
	const { changeAddress, close } = props
	const [state, setState] = useState({
		addresses: {}
	})

	useEffect(() => {
		const addresses = redStore.getState().addresses
		setState((state) => ({
			...state,
			addresses
		}))
	}, [])

	const handlePress = (id) => {
		changeAddress && changeAddress(id)
		close && close()
	}

	return (
		<View>
			<Text style={{ ...Defaults.title, ...Defaults.pad }}>
				Change Address
			</Text>
			<ScrollView>
				{Object.values(state.addresses).map((item, k) => (
					<View style={{ ...Styles.item, ...Defaults.pad }} key={k}>
						<Text style={Styles.name}>{item.nickname}</Text>
						<MyButton
							onPress={() => handlePress(item.id)}
							text="Select"
							color={Defaults.secondary}
							size="small"
						/>
					</View>
				))}
			</ScrollView>
		</View>
	)
}

export default SelectAddress
