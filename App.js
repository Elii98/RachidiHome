import React, { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import MainStack from "./Navigation/MainStack"
import { Provider as PaperProvider } from "react-native-paper"
import Toast from "react-native-toast-message"
import { View } from "react-native"
import { StyleSheet } from "react-native"
import MyButton from "./components/MyButton"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Linking } from "react-native"
import Ripple from "./components/Ripple"

export default function App() {
	return (
		<PaperProvider>
			<NavigationContainer>
				<MainStack />
				<Toast ref={(ref) => Toast.setRef(ref)} />
				<Ripple
					style={styles.contact}
					onPress={() =>
						Linking.openURL(
							"whatsapp://send?phone=96170821187&text=hello"
						)
					}>
					<Ionicons name="logo-whatsapp" size={40} color="#fff" />
				</Ripple>
			</NavigationContainer>
		</PaperProvider>
	)
}

const styles = StyleSheet.create({
	contact: {
		width: 50,
		height: 50,
		borderRadius: 10,
		backgroundColor: "#25D366",
		position: "absolute",
		bottom: 100,
		right: 10,
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	}
})
