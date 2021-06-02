import React, { useEffect, useState } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Splash from "../screens/Splash"
import Register from "../screens/Register"
import ForgotPassword from "../screens/ForgotPassword"
import Home from "../screens/Home"
import Wishlist from "../screens/Wishlist"
import Categories from "../screens/Categories"
import Profile from "../screens/Profile"
import ProfileAddress from "../screens/ProfileAddress"
import AddAddress from "../screens/AddAddress"
import Help from "../screens/Help"
import FAQ from "../screens/FAQ"
import Wallet from "../screens/Wallet"
import ProfileOrders from "../screens/ProfileOrders"
import ReviewOrder from "../screens/ReviewOrder"
import ItemDetails from "../screens/ItemDetails"
import Cart from "../screens/Cart"
import Search from "../screens/Search"
import Checkout from "../screens/Checkout"
import Menu from "../screens/Menu"
import Tabs from "../components/Tabs"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "react-native-vector-icons/Ionicons"
import redStore from "../redux/store"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { bookmark, initialize, login, searchFilter } from "../redux/actions"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const HomeStack = createStackNavigator()
const CatStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const CartStack = createStackNavigator()
const MenuStack = createStackNavigator()

const HomeStackScreens = () => (
	<HomeStack.Navigator screenOptions={{ headerShown: false }}>
		<HomeStack.Screen name="Home" component={Home} />
		<HomeStack.Screen name="ItemDetails" component={ItemDetails} />
	</HomeStack.Navigator>
)

const HomeTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				initialRouteName: "Splash",
				tabBarIcon: ({ focused, color, size }) => {
					let iconName

					if (route.name === "Home") {
						iconName = focused ? "home" : "home-outline"
					} else if (route.name === "Categories") {
						iconName = focused ? "albums" : "albums-outline"
					} else if (route.name === "Profile") {
						iconName = focused ? "person" : "person-outline"
					} else if (route.name === "Cart") {
						iconName = focused ? "cart" : "cart-outline"
					} else if (route.name === "Menu") {
						iconName = focused ? "menu" : "menu-outline"
					}

					// You can return any component that you like here!
					return <Ionicons name={iconName} size={size} color={color} />
				}
			})}
			tabBarOptions={{
				activeTintColor: "tomato",
				inactiveTintColor: "gray",
				labelStyle: {
					fontSize: 13,
					marginBottom: 10
				},
				style: {
					height: 90
				}
			}}
			animationEnabled={true}>
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Categories" component={CatStackScreens} />
			<Tab.Screen name="Cart" component={Cart} />
			<Tab.Screen name="Profile" component={Profile} />
			<Tab.Screen name="Menu" component={MenuStackScreens} />
		</Tab.Navigator>
	)
}

const CatStackScreens = () => (
	<CatStack.Navigator screenOptions={{ headerShown: false }}>
		<CatStack.Screen name="Categories" component={Categories} />
		<CatStack.Screen name="Search" component={Search} />
	</CatStack.Navigator>
)

const ProfileStackScreens = () => (
	<ProfileStack.Navigator screenOptions={{ headerShown: false }}>
		<ProfileStack.Screen name="Profile" component={Profile} />
	</ProfileStack.Navigator>
)

const CartStackScreens = () => (
	<CartStack.Navigator screenOptions={{ headerShown: false }}>
		<CartStack.Screen name="Cart" component={Cart} />
	</CartStack.Navigator>
)

const MenuStackScreens = () => (
	<MenuStack.Navigator screenOptions={{ headerShown: false }}>
		<MenuStack.Screen name="Menu" component={Menu} />
		<MenuStack.Screen name="Wishlist" component={Wishlist} />
		<MenuStack.Screen name="Help" component={Help} />
		<MenuStack.Screen name="FAQ" component={FAQ} />
	</MenuStack.Navigator>
)

const MainStack = () => {
	const [isSignedIn, setIsSignedIn] = useState(false)

	useEffect(() => {
		AsyncStorage.getItem("offlineStore", (err, res) => {
			if (res) {
				const data = JSON.parse(res)
				redStore.dispatch(initialize(data))
				redStore.dispatch(searchFilter({ sort: "alphabetical", filter: [0, 40000000] }))
			}
		})
		redStore.subscribe(() => {
			const login = redStore.getState().login
			login.jwt ? setIsSignedIn(true) : setIsSignedIn(false)
		})
		if (redStore.getState().login?.jwt) {
			const login = redStore.getState().login
			login.jwt ? setIsSignedIn(true) : setIsSignedIn(false)
		}
	}, [])

	return (
		<Stack.Navigator screenOptions={{ headerShown: false, initialRouteName: "Splash" }}>
			{isSignedIn ? (
				<>
					<Stack.Screen name="Home" component={HomeTabs} />
					<Stack.Screen name="ItemDetails" component={ItemDetails} />
					<Stack.Screen name="ProfileAddress" component={ProfileAddress} />
					<Stack.Screen name="Profile" component={Profile} />
					<Stack.Screen name="Register" component={Register} />
				</>
			) : (
				<>
					<Stack.Screen name="Splash" component={Splash} />
					<Stack.Screen name="Register" component={Register} />
					<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
				</>
			)}
			{/* 
			
			<Stack.Screen name="AddAddress" component={AddAddress} />
			<Stack.Screen name="ProfileOrders" component={ProfileOrders} />
			<Stack.Screen name="Wallet" component={Wallet} /> */}
		</Stack.Navigator>
	)
}
export default MainStack

{
	/* <Stack.Screen name="Footer" component={Footer} />
			
			<Stack.Screen name="Wishlist" component={Wishlist} />
			<Stack.Screen name="Categories" component={Categories} />
			
			<Stack.Screen name="ProfileAddress" component={ProfileAddress} />
			<Stack.Screen name="AddAddress" component={AddAddress} />
			<Stack.Screen name="Help" component={Help} />
			<Stack.Screen name="FAQ" component={FAQ} />
			<Stack.Screen name="Wallet" component={Wallet} />
			<Stack.Screen name="ProfileOrders" component={ProfileOrders} />
			<Stack.Screen name="ItemDetails" component={ItemDetails} />
			<Stack.Screen name="Cart" component={Cart} />
			<Stack.Screen name="Search" component={Search} /> */
}
