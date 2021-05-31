import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/Home"
import Cart from "../screens/Cart"
import Profile from "../screens/Profile"
const Tabs = () => {
	const tabs = createBottomTabNavigator()
	return (
		<tabs.navigator>
			<tabs.Screen name="Home" component={Home} />
			<tabs.Screen name="Cart" component={Cart} />
			<tabs.Screen name="Profile" component={Profile} />
		</tabs.navigator>
	)
}

export default Tabs
