import React, { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import MainStack from "./Navigation/MainStack"
import { Provider as PaperProvider } from "react-native-paper"
import Toast from "react-native-toast-message"

export default function App() {
	return (
		<PaperProvider>
			<NavigationContainer>
				<MainStack />
				<Toast ref={(ref) => Toast.setRef(ref)} />
			</NavigationContainer>
		</PaperProvider>
	)
}
