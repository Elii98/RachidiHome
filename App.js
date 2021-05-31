import * as React from "react"
import { StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import MainStack from "./Navigation/MainStack"
import redStore from "./redux/store"

export default function App() {
	return (
		<NavigationContainer>
			<MainStack />
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
})
