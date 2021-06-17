import * as React from "react"
import { StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import MainStack from "./Navigation/MainStack"
import { Provider as PaperProvider } from "react-native-paper"

export default function App() {
	return (
		<PaperProvider>
			<NavigationContainer>
				<MainStack />
			</NavigationContainer>
		</PaperProvider>
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
